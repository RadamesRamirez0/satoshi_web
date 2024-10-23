import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { toast } from '@/modules/common/utils/toast';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';
import {
  estimateBase,
  estimateFeeWithBase,
  estimateFeeWithQuote,
  estimateQuote,
} from '@/modules/express/utils/estimateFiat';
import { p2pRepository } from '@/modules/p2p/repository';

export interface UsePaymentsValues {
  quoteAmount: string;
  baseAmount: string;
  fee: string;
  selectedPaymentId?: string;
  setSelectedPaymentId: (paymentId?: string) => void;
  baseCurrency: string;
  quoteCurrency: string;
  handleCreateOrder: () => Promise<void>;
}

export interface UsePaymentsProps {
  defaultPayment?: string;
  offers: PriceEstimation[];
  amountCurrency: string;
  amountCurrencyType: 'base' | 'quote';
  baseCurrency: string;
  quoteCurrency: string;
  orderType: OrderType;
}

export const usePayments = ({
  defaultPayment,
  offers,
  amountCurrency,
  amountCurrencyType,
  baseCurrency,
  quoteCurrency,
  orderType,
}: UsePaymentsProps): UsePaymentsValues => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | undefined>(
    defaultPayment,
  );
  const t = useTranslations('PaymentMethods');

  const session = useSession();

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

  const handleCreateOrder = async () => {
    if (!selectedPaymentId) {
      toast.error(t('createOrderRequired'));

      return;
    }

    const res = await p2pRepository.createBuyOrder({
      body: {
        order_type: orderType,
        amount_in_from_currency: baseAmount,
        from_currency_id: quoteCurrency,
        to_currency_id: baseCurrency,
        payment_method_id: selectedPaymentId,
      },
      token: session.token,
    });

    if (
      res.error &&
      res.error === 'At least KYC level 1 is required to complete this action.'
    ) {
      toast.error(t('createOrderKycError'));

      return;
    }

    toast.success(t('createOrderSuccess'));
  };

  return {
    quoteAmount,
    baseAmount,
    fee,
    selectedPaymentId,
    setSelectedPaymentId,
    baseCurrency,
    quoteCurrency,
    handleCreateOrder,
  };
};
