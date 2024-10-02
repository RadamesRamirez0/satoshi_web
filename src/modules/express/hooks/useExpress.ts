import Autonumeric from 'autonumeric';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { VoidParamCallback } from '@/modules/common/types/voidCallback';
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
}

export interface InitialExpressValues {
  pay: string;
  payCurrency: string;
  receive: string;
  receiveCurrency: string;
}

const useExpress = (initialValues: InitialExpressValues): UseExpressValues => {
  const [data, setData] = useState<PriceEstimation>();
  const [pay, setPay] = useState<string>('');
  const [receive, setReceive] = useState<string>('');

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      pay: Yup.number().min(1).required(''),
      payCurrency: Yup.string().required(''),
      receive: Yup.number().min(1).required(''),
      receiveCurrency: Yup.string().required(''),
    }),

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

    setReceive(estimateBase(sanitizedPay.toString(), price ?? data?.price ?? ''));
  };

  const handleReceive = (receiveAmount: string, price?: string) => {
    if (!price && !data?.price) {
      return;
    }
    const sanitizedReceive = Autonumeric.unformat(receiveAmount);

    setPay(estimateQuote(sanitizedReceive.toString(), price ?? data?.price ?? ''));
  };

  useEffect(() => {
    const fetchData = () => {
      void getData({
        base_currency: 'btc',
        quote_currency: 'mxn',
        order_type: 'buy',
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

  return { formik, data, handlePay, handleReceive, pay, receive, setPay, setReceive };
};

export default useExpress;
