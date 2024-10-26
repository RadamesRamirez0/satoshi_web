'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import { toast } from '@/modules/common/utils/toast';
import { p2pRepository } from '@/modules/p2p/repository';

export interface OrderActionProps {
  buying: boolean;
  orderId: string;
  status: string;
  postSubmit: () => void;
}

const OrderAction = ({ buying, orderId, status, postSubmit }: OrderActionProps) => {
  const t = useTranslations('OrderView');
  const session = useSession();

  const handleReleaseCrypto = async () => {
    if (!session?.token) {
      return;
    }

    await p2pRepository.releasePaidOrder({
      token: session.token,
      body: { order_id: orderId },
    });
    postSubmit();

    toast.success(t('cryptoReleased'));
  };

  const handleNotifySeller = async () => {
    if (!session?.token) {
      return;
    }

    await p2pRepository.markOrderAsPaid({
      token: session.token,
      body: { order_id: orderId },
    });

    postSubmit();

    toast.success(t('notifySellerSuccess'));
  };

  const handleButton = () => {
    if (buying) {
      void handleNotifySeller();

      return;
    }

    void handleReleaseCrypto();
  };

  if (
    !['waiting_seller_release', 'pending'].includes(status) ||
    (buying && status === 'waiting_seller_release')
  ) {
    return null;
  }

  return (
    <Button
      size='md'
      className='font-bold text-lg'
      onClick={handleButton}
      disabled={!buying && status !== 'waiting_seller_release'}
    >
      {t(buying ? 'notifySeller' : 'releaseCrypto')}
    </Button>
  );
};

export default OrderAction;
