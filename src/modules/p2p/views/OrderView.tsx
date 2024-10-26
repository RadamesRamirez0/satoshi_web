'use client';

import { useTranslations } from 'next-intl';
import React, { FC, useEffect } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import SimpleCard from '@/modules/common/shared-ui/components/simpleCard';
import { Separator } from '@/modules/common/ui/components/separator';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import OrderAction from '@/modules/p2p/components/OrderAction';
import OrderTransactionTimer from '@/modules/p2p/components/OrderTransactionTimer';
import { p2pRepository } from '@/modules/p2p/repository';
import { GetOrderResponse } from '@/modules/p2p/repository/dtos/getOrderDto';
import { usersRepository } from '@/modules/users/repository';
import { UserMeResponse } from '@/modules/users/repository/dtos/userMeDto';

export interface OrderViewProps {
  id: string;
}

const OrderView: FC<OrderViewProps> = ({ id }) => {
  const session = useSession();
  const t = useTranslations('OrderView');
  const [me, setMe] = React.useState<UserMeResponse>();
  const [order, setOrder] = React.useState<GetOrderResponse>();

  const getOrder = () => {
    if (!session?.token) {
      return;
    }

    void p2pRepository
      .getOrder({
        token: session.token,
        pathParams: { order_id: id },
      })
      .then((response) => {
        setOrder(response);
      });
  };

  useEffect(() => {
    if (!session?.token) {
      return;
    }

    void usersRepository.userMe({ token: session.token }).then((response) => {
      setMe(response);
    });

    getOrder();
  }, [session?.token]);

  if ((order && 'detail' in order) || !order) {
    return <div>{order?.detail}</div>;
  }

  if ((me && (me.error || !me.data)) || !me) {
    return <div>{me?.error}</div>;
  }

  const userType = order.maker_user_id === me.data.id ? 'maker' : 'taker';
  const buying = userType === 'taker' && order.order_type === 'buy';

  return (
    <div>
      <span className='flex gap-1'>
        <h2 className='text-whiteBG text-2xl font-bold inline-flex items-center flex-wrap'>
          {t(
            order.status === 'pending'
              ? 'title'
              : order.status === 'waiting_seller_release'
                ? 'pendingRelease'
                : 'orderCompleted',
          )}{' '}
          <span className='inline-block ml-1'>
            <OrderTransactionTimer
              createdAt={order.creation_timestamp}
              timeToComplete={order.maximum_time_for_transaction_completion.toString()}
            />
          </span>
        </h2>
      </span>
      <span className='flex flex-col md:flex-row gap-1 md:items-center'>
        <p className='text-whiteBG/80 font-bold'>{t('orderId')}</p>
        <p className='text-whiteBG font-bold'>{order.id}</p>
      </span>
      <Separator className='my-4' />
      <h3 className='text-xl font-bold pb-2'>{t('step1')}</h3>
      <SimpleCard>
        <span className='flex justify-between w-full font-bold'>
          <p className='text-whiteBG/80'>{t('fiatAmount')}</p>
          <p>{`${order.amount_to_send_in_to_currency} ${order.from_currency_id.toUpperCase()}`}</p>
        </span>
        <span className='flex justify-between w-full font-bold'>
          <p className='text-whiteBG/80'>{t('price')}</p>
          <p>{`${order.price} ${order.from_currency_id.toUpperCase()}`}</p>
        </span>
        <span className='flex justify-between w-full font-bold'>
          <p className='text-whiteBG/80'>{t('receiveQuantity')}</p>
          <p>{`${order.amount_in_from_currency} ${order.to_currency_id.toUpperCase()}`}</p>
        </span>
      </SimpleCard>
      {buying && (
        <>
          <h3 className='text-xl font-bold pb-2 pt-4'>{t('step2')}</h3>
          <SimpleCard>
            {Object.entries(order.payment_method_data).map(([key, value]) => (
              <span className='flex justify-between w-full font-bold' key={key}>
                <p className='text-whiteBG/80'>{capitalizeSnakedWords(key)}</p>
                <p className='text-end'>{value.toUpperCase()}</p>
              </span>
            ))}
          </SimpleCard>
        </>
      )}
      {buying && order.status === 'pending' && (
        <>
          <h3 className='text-xl font-bold pt-4'>{t('step3buying')}</h3>
          <p className='text-whiteBG/80 pb-2'>{t('notifySellerDescrption')}</p>
        </>
      )}
      {!buying && order.status === 'waiting_seller_release' && (
        <>
          <h3 className='text-xl font-bold pt-4'>{t('step3selling')}</h3>
          <p className='text-whiteBG/80 pb-2'>{t('releaseCryptoDescription')}</p>
        </>
      )}

      <span className='flex items-center gap-3'>
        {buying && (
          <OrderAction
            buying={buying}
            orderId={order.id}
            status={order.status}
            postSubmit={getOrder}
          />
        )}
      </span>
    </div>
  );
};

export default OrderView;
