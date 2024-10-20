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

export interface AnnouncementPriceTypeProps {
  priceType?: string;
  setPriceType: (priceType: string) => void;
  priceTypeError: string;
  price?: string;
  setPrice: (price: string) => void;
  currency?: string;
}

const AnnouncementPriceType: FC<AnnouncementPriceTypeProps> = ({
  priceType,
  priceTypeError,
  setPriceType,
  price,
  setPrice,
  currency,
}) => {
  const t = useTranslations('CreateAnnouncement');

  return (
    <>
      <Label className='text-xl'>{t('priceType')}</Label>
      <Tabs onValueChange={setPriceType} value={priceType}>
        <TabsList className='flex w-64' error={!!priceTypeError}>
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
              onValueChange={(v) => setPrice(v.value)}
              fixedDecimalScale
            />
          </span>
          <span>
            <p>{t('yourPrice')}</p>
            <span className='flex'>
              <p className='text-2xl font-bold'>{currency?.toUpperCase()} $</p>
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
