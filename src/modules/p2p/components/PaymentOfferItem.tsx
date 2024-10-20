import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { CardGroupItem } from '@/modules/common/ui/components/card-group';
import { cn } from '@/modules/common/ui/lib/utils';

export interface PaymentOfferItemProps {
  price: number;
  quoteCurrency: string;
  baseCurrency: string;
  paymentId: string;
  paymentName: string;
}

const PaymentOfferItem: FC<PaymentOfferItemProps> = ({
  baseCurrency,
  price,
  quoteCurrency,
  paymentId,
  paymentName,
}) => {
  const t = useTranslations('PaymentMethods');

  return (
    <CardGroupItem value={paymentId} className='w-full'>
      <span className='flex items-center gap-3'>
        <div
          className={cn(
            paymentId === 'spei_mexico' && `bg-[#ff7800]`,
            paymentId === 'paypal' && `bg-[#00457C]`,
            'h-[1.125rem] w-1',
          )}
        ></div>
        <p className='text-lg font-bold'>{paymentName}</p>
      </span>
      <span className='flex items-center gap-3'>
        <p className='text-base text-zinc-400'>{t('unitPrice')}</p>
        <p className='font-medium'>{`1 ${baseCurrency.toUpperCase()} = ${price} ${quoteCurrency.toUpperCase()}`}</p>
        <div className='text-base font-medium text-primary bg-primary/20 px-3 py-0.5 rounded-md'>
          {t('bestOffer')}
        </div>
      </span>
    </CardGroupItem>
  );
};

export default PaymentOfferItem;
