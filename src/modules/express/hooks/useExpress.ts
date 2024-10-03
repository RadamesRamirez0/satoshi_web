import Autonumeric from 'autonumeric';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { VoidParamCallback } from '@/modules/common/types/voidCallback';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import { expressRepository } from '@/modules/express/repository';
import { PriceEstimationDTO } from '@/modules/express/repository/dtos/priceEstimationDto';
import { estimateBase, estimateQuote } from '@/modules/express/utils/estimateFiat';

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
  payCurrency: string;
  receiveCurrency: string;
  setPayCurrency: Dispatch<SetStateAction<string>>;
  setReceiveCurrency: Dispatch<SetStateAction<string>>;
  base: string;
  quote: string;
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
  const [payCurrency, setPayCurrency] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [receiveCurrency, setReceiveCurrency] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [fiatCurrencies, setFiatCurrencies] = useState<Currency[]>();
  const [cryptoCurrencies, setCryptoCurrencies] = useState<Currency[]>();

  const getData = async (values: Omit<PriceEstimationDTO, 'payment_method'>) =>
    await expressRepository.getPriceEstimation({
      ...values,
      payment_method: 'bank_transfer',
    });

  const handlePay = (payAmount: string, price?: string) => {
    if (!price && !data?.price) {
      return;
    }
    if (payAmount === '') {
      setReceive('');

      return;
    }

    const sanitizedPay = Autonumeric.unformat(payAmount);

    let receive: string = '0';

    switch (orderType) {
      case 'buy':
        receive = estimateBase(sanitizedPay.toString(), price ?? data?.price ?? '');
        break;
      case 'sell':
        receive = estimateQuote(sanitizedPay.toString(), price ?? data?.price ?? '');
        break;
    }

    setReceive(receive);
  };

  const handleReceive = (receiveAmount: string, price?: string) => {
    if (!price && !data?.price) {
      return;
    }
    if (receiveAmount === '') {
      setPay('');

      return;
    }

    const sanitizedReceive = Autonumeric.unformat(receiveAmount);

    let pay: string = '0';

    switch (orderType) {
      case 'buy':
        pay = estimateQuote(sanitizedReceive.toString(), price ?? data?.price ?? '');
        break;
      case 'sell':
        pay = estimateBase(sanitizedReceive.toString(), price ?? data?.price ?? '');
        break;
    }

    setPay(pay);
  };

  const getAndSetCurrencies = async () => {
    const currencies = await criptoRepository.getCurrencies();

    const fiatCurrencies = currencies
      .filter((currency) => currency.type === 'fiat')
      .map((c) => ({ ...c, symbol: c.symbol.toUpperCase() }));

    const cryptoCurrencies = currencies
      .filter((currency) => currency.type === 'crypto')
      .map((c) => ({ ...c, symbol: c.symbol.toUpperCase() }));

    setFiatCurrencies(fiatCurrencies);
    setCryptoCurrencies(cryptoCurrencies);
  };

  useEffect(() => {
    void getAndSetCurrencies();

    const fetchData = () => {
      void getData({
        base_currency: 'tbtc',
        quote_currency: 'mxn',
        order_type: orderType,
        amount_in_quoute_currency: orderType === 'buy' ? pay : receive,
      }).then((r) => {
        if (!r.data) {
          return;
        }

        setData(r.data);
      });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const quote = orderType === 'buy' ? pay : receive;

    const isError: boolean =
      parseFloat(Autonumeric.unformat(quote).toString()) <
        parseFloat(data?.minimum_order_amount ?? '100') ||
      parseFloat(Autonumeric.unformat(quote).toString()) >
        parseFloat(data?.maximum_order_amount ?? '2000');

    setIsErrorQuote(isError);
  }, [pay, receive]);

  useEffect(() => {
    setPay('');
    setReceive('');
  }, [orderType]);

  useEffect(() => {
    setPay('');
    if (orderType === 'buy') {
      setQuote(payCurrency);
    }
    if (orderType === 'sell') {
      setBase(payCurrency);
    }
  }, [payCurrency]);
  useEffect(() => {
    setReceive('');
    if (orderType === 'buy') {
      setBase(receiveCurrency);
    }
    if (orderType === 'sell') {
      setQuote(receiveCurrency);
    }
  }, [receiveCurrency]);

  useEffect(() => {
    if (!fiatCurrencies || !cryptoCurrencies) {
      return;
    }
    if (orderType === 'buy') {
      setPayCurrency(fiatCurrencies[0].symbol);
      setReceiveCurrency(cryptoCurrencies[0].symbol);
    }
    if (orderType === 'sell') {
      setPayCurrency(cryptoCurrencies[0].symbol);
      setReceiveCurrency(fiatCurrencies[0].symbol);
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
  };
};

export default useExpress;
