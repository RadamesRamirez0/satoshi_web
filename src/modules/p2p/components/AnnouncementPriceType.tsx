import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import CurrencyLabel from '@/modules/common/ui/components/currencyLabel';
import { InputIncrementer } from '@/modules/common/ui/components/inputIncrementer';
import { Label } from '@/modules/common/ui/components/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/modules/common/ui/components/tabs';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

const AnnouncementPriceType: FC = () => {
  const t = useTranslations('CreateAnnouncement');
  const { formik } = useCreateAnnouncementContext();

  const { price_type, quote, price } = formik.values;

  return (
    <>
      <Label className='text-xl'>{t('priceType')}</Label>
      <Tabs
        onValueChange={(v) => void formik.setFieldValue('price_type', v)}
        value={price_type}
      >
        <TabsList className='flex w-64' error={!!formik.errors.price_type}>
          <TabsTrigger className='flex-1' value='fixed'>
            {t('fixedPrice')}
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='variable'>
            {t('VariablePrice')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='fixed' className='p-4 flex flex-col space-y-8'>
          <span className='space-y-1 flex flex-col'>
            <Label className='text-lg'>Price</Label>
            <InputIncrementer
              className='w-min'
              value={price}
              onValueChange={(v) => void formik.setFieldValue('price', v.value)}
              fixedDecimalScale
              decimals={2}
            />
          </span>
          <span>
            <p>{t('yourPrice')}</p>
            <span className='flex'>
              <p className='text-2xl font-bold'>{quote?.symbol.toUpperCase()} $</p>
              <CurrencyLabel value={price ? price : '0.00'} />
            </span>
          </span>
        </TabsContent>
        <TabsContent value='variable' className='p-4'></TabsContent>
      </Tabs>
    </>
  );
};

export default AnnouncementPriceType;
