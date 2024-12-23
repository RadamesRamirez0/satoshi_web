'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

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
  const [loading, setLoading] = useState(false);

  const handleReleaseCrypto = async () => {
    if (!session?.token) {
      return;
    }
    setLoading(true);
    await p2pRepository.releasePaidOrder({
      token: session.token,
      body: { order_id: orderId },
    });
    postSubmit();
    setLoading(false);

    toast.success(t('cryptoReleased'));
  };

  const handleNotifySeller = async () => {
    if (!session?.token) {
      return;
    }

    setLoading(true);
    await p2pRepository.markOrderAsPaid({
      token: session.token,
      body: { order_id: orderId },
    });

    postSubmit();
    setLoading(false);
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
      loading={loading}
      disabled={(!buying && status !== 'waiting_seller_release') || loading}
    >
      {t(buying ? 'notifySeller' : 'releaseCrypto')}
    </Button>
  );
};

export default OrderAction;
