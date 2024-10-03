import Autonumeric from 'autonumeric';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { VoidParamCallback } from '@/modules/common/types/voidCallback';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import { expressRepository } from '@/modules/express/repository';
import { PriceEstimationDTO } from '@/modules/express/repository/dtos/priceEstimationDto';
import { estimateBase, estimateQuote } from '@/modules/express/utils/estimateFiat';

interface UseExpressValues {
  data?: PriceEstimation;
  formik: ReturnType<typeof useFormik<InitialExpressValues>>;
  handlePay: VoidParamCallback<string>;
  handleReceive: VoidParamCallback<string>;
  pay: string;
  setPay: Dispatch<SetStateAction<string>>;
  receive: string;
  setReceive: Dispatch<SetStateAction<string>>;
  isErrorQuote: boolean;
}

export interface InitialExpressValues {
  payCurrency: string;
  receiveCurrency: string;
}

export interface UseExpressProps {
  initialValues: InitialExpressValues;
  orderType: OrderType;
}

const useExpress = ({ initialValues, orderType }: UseExpressProps): UseExpressValues => {
  const [data, setData] = useState<PriceEstimation>();
  const [pay, setPay] = useState<string>('');
  const [receive, setReceive] = useState<string>('');
  const [isErrorQuote, setIsErrorQuote] = useState<boolean>(false);

  const schemaValidation = Yup.object({
    payCurrency: Yup.string().required(''),

    receiveCurrency: Yup.string().required(''),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schemaValidation,
    onSubmit: () => {},
  });

  const getData = async (values: Omit<PriceEstimationDTO, 'payment_method'>) =>
    await expressRepository.getPriceEstimation({
      ...values,
      payment_method: 'bank_transfer',
    });

  const handlePay = (payAmount: string, price?: string) => {
    if (!price && !data?.price) {
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

  useEffect(() => {
    const fetchData = () => {
      void getData({
        base_currency: 'btc',
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

  return {
    formik,
    data,
    handlePay,
    handleReceive,
    pay,
    receive,
    setPay,
    setReceive,
    isErrorQuote,
  };
};

export default useExpress;
