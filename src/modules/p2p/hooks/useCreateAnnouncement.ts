import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { number, object, string } from 'yup';

import { useSession } from '@/modules/auth/hooks/useSession';
import { useRouter } from '@/modules/common/i18n/routing';
import { toast } from '@/modules/common/utils/toast';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import { p2pRepository } from '@/modules/p2p/repository';
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
  market_price_difference: '0',
  minimum_order_size: '',
  maximum_order_size: '',
  payment_method: undefined as UserPaymentMethod | undefined,
  maximum_time_for_transaction_completion: 900,
};

export const useCreateAnnouncement = (): UseCreateAnnouncementValues => {
  const t = useTranslations('CreateAnnouncement');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currentStep, setCurrentStep] = useState<'price' | 'payment' | 'confirmation'>(
    'price',
  );
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);
  const session = useSession();
  const router = useRouter();

  const formik = useFormik({
    validationSchema: object({
      type: string().required(),
      base: object<Currency>().required(),
      quote: object<Currency>().required(),
      amount: string().required(),
      price: string(),
      price_type: string().required(),
      market_price_difference: string(),
      minimum_order_size: string().required(),
      maximum_order_size: string().required(),
      payment_method: object<UserPaymentMethod>().required(),
      maximum_time_for_transaction_completion: number().required(),
    }),
    initialValues,
    onSubmit: async ({
      base,
      quote,
      payment_method,
      market_price_difference,
      price,
      ...payload
    }) => {
      if (!base || !quote || !payment_method || !session?.token) {
        return;
      }

      const res = await p2pRepository.createAnnouncement({
        token: session.token,
        body: {
          base: base.symbol,
          quote: quote.symbol,
          payment_method: payment_method.payment_method_id,
          market_price_difference: parseInt(market_price_difference, 10),
          price,
          ...payload,
        },
      });

      if (res.error) {
        toast.error(res.error);

        return;
      }

      toast.success(t('createSuccess'));

      router.push('/p2p/announcements');
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
        break;
      case 'confirmation':
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
