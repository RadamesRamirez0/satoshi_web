'use client';

import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { CardGroup } from '@/modules/common/ui/components/card-group';
import { usePaymentsContext } from '@/modules/express/contexts/PaymentsContext';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import PaymentOfferItem from '@/modules/p2p/components/PaymentOfferItem';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';

export interface PaymentsOffersProps {
  offers: PriceEstimation[];
  payments: PaymentMethod[];
}
const PaymentsOffers: FC<PaymentsOffersProps> = ({ offers, payments }) => {
  const t = useTranslations('PaymentMethods');
  const { selectedPaymentId, setSelectedPaymentId, handleCreateOrder } =
    usePaymentsContext();

  return (
    <div className='flex-1 space-y-8'>
      <CardGroup
        className='space-y-4'
        value={selectedPaymentId ?? ''}
        onValueChange={setSelectedPaymentId}
      >
        {offers.map((data) => {
          return (
            <PaymentOfferItem
              paymentId={data.payment_method}
              paymentName={payments.find((p) => p.id === data.payment_method)?.name ?? ''}
              key={data.payment_method}
              baseCurrency={data.base_currency}
              price={parseFloat(data.price)}
              quoteCurrency={data.quote_currency}
            />
          );
        })}
      </CardGroup>
      <Button
        size='lg'
        className='w-full text-xl font-bold'
        onClick={() => void handleCreateOrder()}
      >
        {t('createOrder')}
      </Button>
    </div>
  );
};

export default PaymentsOffers;
