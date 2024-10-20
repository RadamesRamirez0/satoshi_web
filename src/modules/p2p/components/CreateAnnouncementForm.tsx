'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { number, object, string } from 'yup';

import {
  Tabs as MainTabs,
  TabsContent as MainTabsContent,
  TabsList as MainTabsList,
  TabsTrigger as MainTabsTrigger,
} from '@/modules/common/ui/components/main-tabs';
import { Separator } from '@/modules/common/ui/components/separator';
import Steps from '@/modules/common/ui/components/steps';
import { TabsContent } from '@/modules/common/ui/components/tabs';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import AnnouncementCurrencies from '@/modules/p2p/components/AnnouncementCurrencies';
import AnnouncementPriceType from '@/modules/p2p/components/AnnouncementPriceType';
import { p2pRepository } from '@/modules/p2p/repository';
import { CreateAnnouncementDTO } from '@/modules/p2p/repository/dtos/createAnnouncementDto';

const CreateAnnouncementForm = () => {
  const t = useTranslations('CreateAnnouncement');

  const [currencies, setCurrencies] = useState<Currency[]>([]);

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
    initialValues: {
      type: 'buy' as 'buy' | 'sell',
      price_type: 'fixed' as 'fixed' | 'variable',
      base: {} as Currency,
      quote: {} as Currency,
      amount: '',
      price: '',
      market_price_difference: undefined,
      minimum_order_size: '',
      maximum_order_size: '',
      payment_method: '',
      maximum_time_for_transaction_completion: 0,
    },
    onSubmit: () => {
      void p2pRepository.createAnnouncement({ body: {} });
    },
  });
  useEffect(() => {
    void criptoRepository.getCurrencies({}).then((data) => {
      setCurrencies(data);
    });
  }, []);

  return (
    <div className='space-y-6'>
      <Steps orientation='horizontal' steps={[t('step1'), t('step2')]} currentStep={2} />
      <form className='border rounded-lg overflow-hidden'>
        <MainTabs
          onValueChange={(v) => void formik.setFieldValue('type', v)}
          value={formik.values.type}
        >
          <MainTabsList className='flex  rounded-b-none'>
            <MainTabsTrigger className='flex-1 text-base' value='buy'>
              {t('buy')}
            </MainTabsTrigger>
            <MainTabsTrigger className='flex-1 text-base' value='sell'>
              {t('sell')}
            </MainTabsTrigger>
          </MainTabsList>
          <MainTabsContent
            value='buy'
            className='p-4 gap-4 flex flex-col  m-0 rounded-b-lg'
          >
            <AnnouncementCurrencies
              base={formik.values.base}
              quote={formik.values.quote}
              setBase={(v) => void formik.setFieldValue('base', v)}
              setQuote={(v) => void formik.setFieldValue('quote', v)}
              currencies={currencies}
            />
            <span>
              <Separator className='my-4' />
              <AnnouncementPriceType
                priceType={formik.values.price_type}
                priceTypeError={formik.errors.price_type as string}
                setPriceType={(v) => void formik.setFieldValue('price_type', v)}
                price={formik.values.price}
                setPrice={(v) => void formik.setFieldValue('price', v)}
                currency={formik.values.quote.symbol}
              />
            </span>
          </MainTabsContent>
          <TabsContent value='sell' className='p-4'></TabsContent>
        </MainTabs>
      </form>
    </div>
  );
};

export default CreateAnnouncementForm;
