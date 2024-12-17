'use client';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { useRouter } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';
import OrderTransactionTimer from '@/modules/p2p/components/OrderTransactionTimer';
import { Order } from '@/modules/p2p/models/order';
import { usersRepository } from '@/modules/users/repository';

const ActiveOrderBanner = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [myOrders, setMyOrders] = useState<Order[]>();
  const session = useSession();
  const navigate = useRouter();
  const t = useTranslations('OrderView');

  const getMyOrders = async () => {
    if (!session?.token) {
      return;
    }

    const res = await usersRepository.myOrders({
      token: session.token,
      queryParams: { user_id: session.user.id },
    });
    if ('detail' in res) {
      return;
    }

    setMyOrders(
      res.filter((r) =>
        ['pending', 'on_appeal', 'waiting_seller_release'].includes(r.status),
      ),
    );
  };

  useEffect(() => {
    if (!session?.token) {
      return;
    }

    void getMyOrders();

    const interval = setInterval(() => {
      void getMyOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [session?.token]);

  if (!myOrders || myOrders.length === 0) {
    return null;
  }

  return (
    <div className='fixed  w-full flex justify-center z-50 '>
      <div className='absolute mt-3 bg-background rounded-lg border border-zinc-700 py-2 w-52'>
        <span className='flex items-center px-4 gap-3 justify-between'>
          <p className='font-medium'>{t('bannerTitle')}</p>
          <button onClick={() => setShowDetails((prev) => !prev)}>
            <ChevronDownIcon
              className={cn(
                'size-5 hover:text-whiteBG/80 transition-all',
                showDetails && 'rotate-180',
              )}
            />
          </button>
        </span>

        {showDetails &&
          myOrders.map((o) => (
            <Button
              variant='ghost'
              className='w-full flex justify-between'
              key={o.id}
              onClick={() => navigate.push(`/p2p/orders/${o.id}`)}
            >
              {t(o.status as 'on_appeal' | 'waiting_seller_release')}
              <OrderTransactionTimer
                createdAt={o.creation_timestamp}
                timeToComplete={o.maximum_time_for_transaction_completion.toString()}
                small
              />
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ActiveOrderBanner;
