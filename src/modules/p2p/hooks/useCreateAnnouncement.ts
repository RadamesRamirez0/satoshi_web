import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { number, object, string } from 'yup';

import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import { p2pRepository } from '@/modules/p2p/repository';
import { CreateAnnouncementDTO } from '@/modules/p2p/repository/dtos/createAnnouncementDto';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';

export interface UseCreateAnnouncementValues {
  formik: ReturnType<typeof useFormik<typeof initialValues>>;
  currencies: Currency[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  currentStep: 'price' | 'payment' | 'confirmation';
  loadingCurrencies: boolean;
}

const initialValues = {
  type: 'buy' as 'buy' | 'sell',
  price_type: 'fixed' as 'fixed' | 'variable',
  base: undefined as Currency | undefined,
  quote: undefined as Currency | undefined,
  amount: '',
  price: '0.00',
  market_price_difference: undefined,
  minimum_order_size: '',
  maximum_order_size: '',
  payment_method: undefined as UserPaymentMethod | undefined,
  maximum_time_for_transaction_completion: 900,
};

export const useCreateAnnouncement = (): UseCreateAnnouncementValues => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currentStep, setCurrentStep] = useState<'price' | 'payment' | 'confirmation'>(
    'price',
  );
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);

  const formik = useFormik({
    validationSchema: object({
      type: string<CreateAnnouncementDTO['type']>().required(),
      base: object<Currency>().required(),
      quote: object<Currency>().required(),
      amount: string().required(),
      price: string().required(),
      price_type: string().required(),
      market_price_difference: string().required(),
      minimum_order_size: string().required(),
      maximum_order_size: string().required(),
      payment_method: string().required(),
      maximum_time_for_transaction_completion: number().required(),
    }),
    initialValues,
    onSubmit: ({ base, quote, payment_method, ...payload }) => {
      if (!base || !quote || !payment_method) {
        return;
      }

      void p2pRepository.createAnnouncement({
        body: {
          base: base.symbol,
          quote: quote.symbol,
          payment_method: payment_method.payment_method_id,
          ...payload,
        },
      });
    },
  });

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'price':
        break;
      case 'payment':
        setCurrentStep('price');
        break;
      case 'confirmation':
        setCurrentStep('payment');
        break;
    }
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'price':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        formik.handleSubmit();
        break;
    }
  };

  useEffect(() => {
    setLoadingCurrencies(true);
    void criptoRepository.getCurrencies({}).then((data) => {
      setCurrencies(data);
      setLoadingCurrencies(false);
    });
  }, []);

  return {
    formik,
    currencies,
    handleNextStep,
    handlePreviousStep,
    currentStep,
    loadingCurrencies,
  };
};
