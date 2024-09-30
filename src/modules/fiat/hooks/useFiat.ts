import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { VoidParamCallback } from '@/modules/common/types/voidCallback';
import { PriceEstimation } from '@/modules/fiat/models/priceEstimation';
import { fiatRepository } from '@/modules/fiat/repository';
import { PriceEstimationDTO } from '@/modules/fiat/repository/dtos/priceEstimationDto';

interface UseFiatValues {
  data?: PriceEstimation;
  formik: ReturnType<typeof useFormik<typeof initialValues>>;
  handlePay: VoidParamCallback<string>;
  handleReceive: VoidParamCallback<string>;
}

const initialValues = {
  pay: '',
  payCurrency: 'MXN',
  receive: '1',
  receiveCurrency: 'BTC',
};

const useFiat = (): UseFiatValues => {
  const [data, setData] = useState<PriceEstimation>();

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
    await fiatRepository.getPriceEstimation({
      ...values,
      payment_method: 'bank_transfer',
    });

  const handlePay = async (pay: string) => {
    if (await formik.setFieldValue('pay', pay)) {
      return;
    }
  };

  const handleReceive = async (receive: string) => {
    const change = await formik.setFieldValue('receive', receive);
    if (change && change.pay !== '') {
      return;
    }

    const res = await getData({
      base_currency: 'MXN',
      quote_currency: 'BTC',
      order_type: 'buy',
      amount_in_quoute_currency: receive,
    });

    if (!res.data) {
      return;
    }

    setData(res.data);

    await formik.setFieldValue('pay', res.data.price);
  };

  useEffect(() => {
    void getData({
      base_currency: 'MXN',
      quote_currency: 'BTC',
      order_type: 'buy',
    }).then((r) => {
      if (!r.data) {
        return;
      }

      setData(r.data);
      void formik.setFieldValue('pay', r.data.price);
    });
  }, []);

  return { formik, data, handlePay, handleReceive };
};

export default useFiat;
