'use client';

import { useRouter } from 'next/dist/client/components/navigation';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { apiUrl } from '@/modules/common/constants/env';
import Chat, { NewMessage } from '@/modules/common/shared-ui/components/Chat';
import SimpleCard from '@/modules/common/shared-ui/components/simpleCard';
import { Separator } from '@/modules/common/ui/components/separator';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import { toast } from '@/modules/common/utils/toast';
import OrderAction from '@/modules/p2p/components/OrderAction';
import OrderTransactionTimer from '@/modules/p2p/components/OrderTransactionTimer';
import { Message } from '@/modules/p2p/models/message';
import { p2pRepository } from '@/modules/p2p/repository';
import { GetOrderResponse } from '@/modules/p2p/repository/dtos/getOrderDto';
import { SendMessageResponse } from '@/modules/p2p/repository/dtos/sendMessageDto';
import { usersRepository } from '@/modules/users/repository';
import { UserMeResponse } from '@/modules/users/repository/dtos/userMeDto';

export interface OrderViewProps {
  id: string;
}

const OrderView: FC<OrderViewProps> = ({ id }) => {
  const session = useSession();
  const t = useTranslations('OrderView');
  const [me, setMe] = useState<UserMeResponse>();
  const [order, setOrder] = useState<GetOrderResponse>();
  const [messages, setMessages] = useState<Message[]>();
  const navigate = useRouter();

  const getImage = async (
    messageId: string,
  ): Promise<{ url: string; type: string } | undefined> => {
    if (!session?.token) {
      return;
    }

    const res = await fetch(`${apiUrl}/v1/chat/attachments/${messageId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }).catch(() => false);

    if (typeof res === 'boolean') {
      return;
    }

    const blob = await res.blob();

    return {
      url: URL.createObjectURL(blob),
      type: res.headers.get('content-type') ?? 'image/png',
    };
  };

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

  const getMessages = () => {
    if (!order || !session?.token || 'detail' in order) {
      return;
    }
    void p2pRepository
      .getMessages({ pathParams: { operation_id: order.id }, token: session.token })
      .then((m) => {
        if (m.data) {
          setMessages(m.data);
        }
      });
  };

  const sendMessage = async (message: NewMessage) => {
    if (!session?.token || !order || 'detail' in order) {
      return false;
    }

    const formData = new FormData();

    formData.append('operation_id', order.id);
    formData.append('message', message.message);
    if (message.file) {
      formData.append('file', message.file);
    }

    const res = await fetch(`${apiUrl}/v1/chat/messages/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }).catch(() => {
      return false;
    });

    if (typeof res === 'boolean') {
      return false;
    }

    const json = (await res.json()) as SendMessageResponse;

    if ('detail' in json) {
      toast.error(json.detail as string);
    }

    getMessages();

    if (json.error) {
      toast.error(json.error);

      return false;
    }

    return true;
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

  useEffect(() => {
    getMessages();
    const interval = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [session?.token, order]);

  useEffect(() => {
    const interval = setInterval(() => {
      getOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [session?.token]);

  useEffect(() => {
    if (!order || !session || 'detail' in order) {
      return;
    }

    if (![order.maker_user_id, order.taker_user_id].includes(session.user.id)) {
      navigate.replace('/');
    }
  }, [order, session]);

  if (order && 'detail' in order) {
    return <div>{order.detail}</div>;
  }

  if (!order) {
    return <>order not found</>;
  }

  if ((me && (me.error || !me.data)) || !me) {
    return <div>{me?.error}</div>;
  }

  const userType = order.maker_user_id === me.data.id ? 'maker' : 'taker';
  const buying =
    (userType === 'taker' && order.order_type === 'buy') ||
    (userType === 'maker' && order.order_type === 'sell');

  return (
    <div className='flex gap-6 justify-between'>
      <div>
        <span className='flex gap-1'>
          <h2 className='text-whiteBG text-2xl font-bold inline-flex items-center flex-wrap'>
            {buying &&
              t(
                order.status === 'pending'
                  ? 'title'
                  : order.status === 'waiting_seller_release'
                    ? 'pendingRelease'
                    : order.status === 'on_appeal'
                      ? 'orderAppeal'
                      : 'orderCompleted',
              )}
            {!buying &&
              t(
                order.status === 'pending'
                  ? 'titleSeller'
                  : order.status === 'waiting_seller_release'
                    ? 'pendingSellerRelease'
                    : order.status === 'on_appeal'
                      ? 'orderAppeal'
                      : 'orderCompleted',
              )}
            <span className='inline-block ml-1'>
              {!['on_appeal', 'complete'].includes(order.status) && (
                <OrderTransactionTimer
                  createdAt={order.creation_timestamp}
                  timeToComplete={order.maximum_time_for_transaction_completion.toString()}
                />
              )}
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
                <span className='flex  gap-3 justify-between w-full font-bold' key={key}>
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
        {buying && ['waiting_seller_release', 'pending'].includes(order.status) && (
          <>
            <h3 className='text-xl font-bold pt-4'>{t('pendingRelease')}</h3>
            <p className='text-whiteBG/80 pb-2'>{t('pendingReleaseDesc')}</p>
          </>
        )}
        {!buying && order.status === 'waiting_seller_release' && (
          <>
            <h3 className='text-xl font-bold pt-4'>{t('step3selling')}</h3>
            <p className='text-whiteBG/80 pb-2'>{t('releaseCryptoDescription')}</p>
          </>
        )}

        <span className='flex items-center gap-3'>
          <OrderAction
            buying={buying}
            orderId={order.id}
            status={order.status}
            postSubmit={getOrder}
          />
        </span>
      </div>
      <Chat
        receiverName={buying ? order.seller_name : order.buyer_name}
        messages={messages ?? []}
        onSend={sendMessage}
        getImage={getImage}
      />
    </div>
  );
};

export default OrderView;
