'use client';

import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { usePaymentsContext } from '@/modules/express/contexts/PaymentsContext';

const PreviewOrderCard: FC = () => {
  const { baseAmount, fee, quoteAmount, baseCurrency, quoteCurrency } =
    usePaymentsContext();
  const t = useTranslations('PreviewOrder');

  return (
    <Card>
      <CardContent className='space-y-2'>
        <h2 className='font-bold text-lg pb-2'>{t('title')}</h2>
        <span className='flex justify-between items-center'>
          <p className='text-zinc-500 font-bold'>{t('youPay')}</p>
          <p className='font-bold text-lg'>{`${quoteAmount} ${quoteCurrency.toUpperCase()}`}</p>
        </span>
        <span className='flex justify-between items-center'>
          <p className='text-zinc-500 font-bold'>{t('youReceive')}</p>
          <p className='font-bold text-lg'>{`${baseAmount} ${baseCurrency.toUpperCase()}`}</p>
        </span>
        <span className='flex justify-between items-center'>
          <p className='text-zinc-500 font-bold'>{t('fee')}</p>
          <p className='font-bold text-lg'>{`${fee} ${baseCurrency.toUpperCase()}`}</p>
        </span>
        {/* <span className='flex justify-between items-center'>
          <p className='font-bold'>Tiempo límite de pago</p>
          <p className='font-bold text-lg'>10 minutos</p>
        </span> */}
      </CardContent>
    </Card>
  );
};

export default PreviewOrderCard;
