import React, { FC } from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import PaymentsOffers from '@/modules/express/components/PaymentsOffers';
import PreviewOrderCard from '@/modules/express/components/PreviewOrderCard';
import { PaymentsProvider } from '@/modules/express/contexts/PaymentsContext';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import { expressRepository } from '@/modules/express/repository';
import { p2pRepository } from '@/modules/p2p/repository';

export interface PaymentsOrdersViewProps {
  amountCurrencyType: 'base' | 'quote';
  amountCurrency: string;
  baseCurrency: string;
  quoteCurrency: string;
  orderType: OrderType;
}

const PaymentsOrdersView: FC<PaymentsOrdersViewProps> = async ({
  baseCurrency,
  quoteCurrency,
  orderType,
  amountCurrency,
  amountCurrencyType,
}) => {
  const session = await getSession();

  const payments = await p2pRepository.paymentMethods({
    token: session?.token,
  });

  if (!payments.data || payments.error) {
    return <div>Something went wrong</div>;
  }

  const estimations = payments.data.map((p) =>
    expressRepository.getPriceEstimation({
      queryParams: {
        base_currency: baseCurrency,
        quote_currency: quoteCurrency,
        amount_in_quote_currency:
          amountCurrencyType === 'base' ? amountCurrency : undefined,
        order_type: orderType,
        payment_method: p.id,
      },
    }),
  );

  const estimationsAvailables = (await Promise.allSettled(estimations)).filter(
    (e) => e.status === 'fulfilled',
  );

  const offers = estimationsAvailables
    .filter((e) => e.value.data !== null)
    .map((e) => e.value.data as PriceEstimation);

  return (
    <div className='flex gap-12 justify-between items-start'>
      <PaymentsProvider
        defaultPayment={offers[0]?.payment_method ?? undefined}
        {...{
          amountCurrency,
          amountCurrencyType,
          offers,
          baseCurrency,
          quoteCurrency,
          orderType,
        }}
      >
        <PaymentsOffers offers={offers} payments={payments.data} />
        <div className='flex-1'>
          <PreviewOrderCard />
        </div>
      </PaymentsProvider>
    </div>
  );
};

export default PaymentsOrdersView;
