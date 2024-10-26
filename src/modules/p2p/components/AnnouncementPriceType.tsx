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

  const { price_type, quote, price, market_price_difference } = formik.values;

  return (
    <div className='space-y-2'>
      <Label className='text-xl' htmlFor='price_type'>
        {t('priceType')}
      </Label>
      <Tabs
        id='price_type'
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
        {price_type === 'fixed' && (
          <TabsContent value='fixed' className='p-4 flex flex-col space-y-8'>
            <span className='space-y-1 flex flex-col'>
              <Label className='text-lg' htmlFor='price'>
                {t('price')}
              </Label>
              <InputIncrementer
                id='price'
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
        )}
        {price_type === 'variable' && (
          <TabsContent value='variable' className='p-4 flex flex-col space-y-8'>
            <span className='space-y-1 flex flex-col'>
              <Label className='text-lg' htmlFor='market_price_difference'>
                {t('variable')}
              </Label>
              <InputIncrementer
                id='market_price_difference'
                className='w-min'
                value={market_price_difference}
                onValueChange={(v) =>
                  void formik.setFieldValue('market_price_difference', v.value)
                }
                fixedDecimalScale
                decimals={0}
                percent
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
        )}
      </Tabs>
    </div>
  );
};

export default AnnouncementPriceType;
