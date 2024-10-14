'use client';

import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { usePaymentsContext } from '@/modules/express/contexts/PaymentsContext';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import {
  estimateBase,
  estimateFeeWithBase,
  estimateFeeWithQuote,
  estimateQuote,
} from '@/modules/express/utils/estimateFiat';

export interface PreviewOrderCardProps {
  amountCurrencyType: 'base' | 'quote';
  amountCurrency: string;
  baseCurrency: string;
  quoteCurrency: string;
  offers: PriceEstimation[];
}

const PreviewOrderCard: FC<PreviewOrderCardProps> = ({
  amountCurrency,
  amountCurrencyType,
  quoteCurrency,
  baseCurrency,
  offers,
}) => {
  const { selectedPaymentId } = usePaymentsContext();
  const t = useTranslations('PreviewOrder');

  let quoteAmount = '';
  let baseAmount = '';
  let fee = '';

  const currentOffer = offers.find((o) => o.payment_method === selectedPaymentId);
  const price = currentOffer?.price ?? '0';
  const feePercent = currentOffer?.fee_percentage ?? '0.2';

  if (amountCurrencyType === 'quote') {
    quoteAmount = amountCurrency;
    baseAmount = estimateBase(amountCurrency, price, feePercent);
    fee = estimateFeeWithQuote(amountCurrency, price, feePercent);
  }
  if (amountCurrencyType === 'base') {
    baseAmount = amountCurrency;
    quoteAmount = estimateQuote(amountCurrency, price, feePercent);
    fee = estimateFeeWithBase(amountCurrency, feePercent);
  }

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
