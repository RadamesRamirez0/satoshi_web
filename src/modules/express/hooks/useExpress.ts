import Autonumeric from 'autonumeric';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { VoidParamCallback } from '@/modules/common/types/voidCallback';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from '@/modules/cripto/utils/filterCurrencies';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import { expressRepository } from '@/modules/express/repository';
import { PriceEstimationDTO } from '@/modules/express/repository/dtos/priceEstimationDto';
import { estimateBase, estimateQuote } from '@/modules/express/utils/estimateFiat';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';

export interface UseExpressValues {
  data?: PriceEstimation;

  handlePay: VoidParamCallback<string>;
  handleReceive: VoidParamCallback<string>;
  pay: string;
  setPay: Dispatch<SetStateAction<string>>;
  receive: string;
  setReceive: Dispatch<SetStateAction<string>>;
  isErrorQuote: boolean;
  orderType: OrderType;
  setOrderType: VoidParamCallback<OrderType>;
  fiatCurrencies?: Currency[];
  cryptoCurrencies?: Currency[];
  payCurrency?: Currency;
  receiveCurrency?: Currency;
  setPayCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  setReceiveCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  base: string;
  quote: string;
  paymentMethod?: PaymentMethod;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod | undefined>>;
  userMethod?: UserPaymentMethod;
  setUserMethod: Dispatch<SetStateAction<UserPaymentMethod | undefined>>;
}

export interface InitialExpressValues {
  payCurrency: string;
  receiveCurrency: string;
}

const useExpress = (): UseExpressValues => {
  const [orderType, setOrderType] = useState<OrderType>('buy');
  const [data, setData] = useState<PriceEstimation>();
  const [pay, setPay] = useState<string>('');
  const [receive, setReceive] = useState<string>('');
  const [isErrorQuote, setIsErrorQuote] = useState<boolean>(false);
  const [payCurrency, setPayCurrency] = useState<Currency>();
  const [quote, setQuote] = useState<string>('');
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>();
  const [base, setBase] = useState<string>('');
  const [fiatCurrencies, setFiatCurrencies] = useState<Currency[]>();
  const [cryptoCurrencies, setCryptoCurrencies] = useState<Currency[]>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [userMethod, setUserMethod] = useState<UserPaymentMethod>();
  const [lastModified, setLastModified] = useState<'pay' | 'receive'>('pay');

  const getData = async (values: PriceEstimationDTO) =>
    await expressRepository.getPriceEstimation({
      queryParams: {
        ...values,
      },
    });

  const handlePay = (payAmount: string) => {
    setLastModified('pay');

    if (!data?.price) {
      return;
    }
    if (payAmount === '') {
      setReceive('');

      return;
    }

    const sanitizedPay = Autonumeric.unformat(payAmount, {
      decimalPlaces: payCurrency?.precision,
      allowDecimalPadding: 'floats',
    });

    let receive: string = '0';

    switch (orderType) {
      case 'buy':
        receive = estimateBase(sanitizedPay.toString(), data.price, data.fee_percentage);
        break;
      case 'sell':
        receive = estimateQuote(sanitizedPay.toString(), data.price, data.fee_percentage);
        break;
    }

    setReceive(receive);
  };

  const handleReceive = (receiveAmount: string) => {
    setLastModified('receive');
    if (!data?.price) {
      return;
    }
    if (receiveAmount === '') {
      setPay('');

      return;
    }

    const sanitizedReceive = Autonumeric.unformat(receiveAmount, {
      decimalPlaces: receiveCurrency?.precision,
      allowDecimalPadding: 'floats',
    });

    let pay: string = '0';

    switch (orderType) {
      case 'buy':
        pay = estimateQuote(sanitizedReceive.toString(), data.price, data.fee_percentage);
        break;
      case 'sell':
        pay = estimateBase(sanitizedReceive.toString(), data.price, data.fee_percentage);
        break;
    }

    setPay(pay);
  };

  const getAndSetCurrencies = async () => {
    const currencies = await criptoRepository.getCurrencies({});

    const fiatCurrencies = getFiatCurrencies(currencies);

    const cryptoCurrencies = getCryptoCurrencies(currencies);

    setFiatCurrencies(fiatCurrencies);
    setCryptoCurrencies(cryptoCurrencies);
  };

  const fetchData = () => {
    if (!base || !quote) {
      return;
    }

    void getData({
      base_currency: base.toLowerCase(),
      quote_currency: quote.toLowerCase(),
      order_type: orderType,
      amount_in_quote_currency: (orderType === 'buy' ? receive : pay) || undefined,
      payment_method:
        orderType === 'buy' ? paymentMethod?.id : userMethod?.payment_method_id,
    }).then((r) => {
      if (!r.data) {
        return;
      }

      setData(r.data);
    });
  };
  useEffect(() => {
    void getAndSetCurrencies();
  }, []);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, [base, quote, orderType, pay, receive, paymentMethod, userMethod]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (lastModified === 'pay') {
      handlePay(pay);

      return;
    }

    handleReceive(receive);
  }, [data]);

  useEffect(() => {
    setPay('');
    setReceive('');
  }, [orderType]);

  useEffect(() => {
    setPay('');
    if (orderType === 'buy' && payCurrency) {
      setQuote(payCurrency.symbol);
    }
    if (orderType === 'sell' && payCurrency) {
      setBase(payCurrency.symbol);
    }
  }, [payCurrency]);

  useEffect(() => {
    setReceive('');
    if (orderType === 'buy' && receiveCurrency) {
      setBase(receiveCurrency.symbol);
    }
    if (orderType === 'sell' && receiveCurrency) {
      setQuote(receiveCurrency.symbol);
    }
  }, [receiveCurrency]);

  useEffect(() => {
    if (!fiatCurrencies || !cryptoCurrencies) {
      return;
    }
    if (orderType === 'buy') {
      setPayCurrency(fiatCurrencies[0]);
      setReceiveCurrency(cryptoCurrencies[0]);
    }
    if (orderType === 'sell') {
      setPayCurrency(cryptoCurrencies[0]);
      setReceiveCurrency(fiatCurrencies[0]);
    }
  }, [fiatCurrencies, cryptoCurrencies, orderType]);

  return {
    data,
    handlePay,
    handleReceive,
    pay,
    receive,
    setPay,
    setReceive,
    isErrorQuote,
    orderType,
    setOrderType,
    fiatCurrencies,
    cryptoCurrencies,
    payCurrency,
    receiveCurrency,
    setPayCurrency,
    setReceiveCurrency,
    base,
    quote,
    paymentMethod,
    setPaymentMethod,
    userMethod,
    setUserMethod,
  };
};

export default useExpress;
