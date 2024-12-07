'use client';

import { useQuery } from '@tanstack/react-query';
import Autonumeric from 'autonumeric';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { useRouter } from '@/modules/common/i18n/routing';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/modules/common/ui/components/alert';
import { Button } from '@/modules/common/ui/components/button';
import { DialogClose, DialogContent } from '@/modules/common/ui/components/dialog';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { createTimer } from '@/modules/common/utils/createTimer';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import { toast } from '@/modules/common/utils/toast';
import { estimateBase, estimateQuote } from '@/modules/express/utils/estimateFiat';
import { Announcement } from '@/modules/p2p/models/announcement';
import { p2pRepository } from '@/modules/p2p/repository';
import PhotoProfile from '@/modules/users/components/PhotoProfile';

export interface TakeAnnouncementProps {
  announcementId: string;
}

const TakeAnnouncement = ({ announcementId }: TakeAnnouncementProps) => {
  const [lastModified, setLastModified] = useState<'pay' | 'receive'>();
  const [pay, setPay] = useState('');

  const [receive, setReceive] = useState('');
  const [errorPay, setErrorPay] = useState(false);
  const [errorReceive, setErrorReceive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timeRefetchingSeconds = 30;
  const t = useTranslations('P2PView');
  const tActions = useTranslations('actions');
  const navigate = useRouter();
  const session = useSession();

  const { data, isLoading, isFetched, isRefetching } = useQuery({
    queryKey: ['announcement', announcementId],
    queryFn: () =>
      p2pRepository.getAnnouncement({ pathParams: { announcement_id: announcementId } }),
    refetchInterval: (a) => {
      if (!a.state.data || 'error' in a.state.data) {
        return undefined;
      }

      if ((a.state.data as Announcement).price_type === 'variable') {
        return timeRefetchingSeconds * 1000;
      }
    },
  });

  const handlePay = (payAmount: string) => {
    setErrorPay(false);
    setPay(payAmount);
    setErrorReceive(false);
    setLastModified('pay');

    if (!data || 'error' in data) {
      return;
    }

    const d = data as Announcement;

    if (!d.price) {
      return;
    }
    if (payAmount === '') {
      setReceive('');

      return;
    }

    const sanitizedPay = Autonumeric.unformat(payAmount, {
      decimalPlaces: announcement.type === 'buy' ? 8 : 2,
      allowDecimalPadding: 'floats',
    });

    let receive: string = '0';

    const minOrder = parseFloat(announcement.minimum_order_size);
    const maxOrder = parseFloat(announcement.maximum_order_size);
    const payFloat =
      typeof sanitizedPay === 'string' ? parseFloat(sanitizedPay) : sanitizedPay;

    switch (announcement.type) {
      case 'buy':
        receive = estimateQuote(sanitizedPay.toString(), d.price, '0.4');

        if (payFloat > maxOrder || payFloat < minOrder) {
          setErrorReceive(true);
          setErrorPay(true);
        }

        break;
      case 'sell':
        receive = estimateBase(sanitizedPay.toString(), d.price, '0.4');

        if (parseFloat(receive) > maxOrder || parseFloat(receive) < minOrder) {
          setErrorReceive(true);
          setErrorPay(true);
        }
        break;
    }

    setReceive(receive);
  };

  const handleReceive = (receiveAmount: string) => {
    setReceive(receiveAmount);
    setErrorPay(false);
    setErrorReceive(false);
    setLastModified('receive');

    if (!data || 'error' in data) {
      return;
    }

    const d = data as Announcement;

    if (!d.price) {
      return;
    }
    if (receiveAmount === '') {
      setPay('');

      return;
    }

    const sanitizedReceive = Autonumeric.unformat(receiveAmount, {
      decimalPlaces: announcement.type === 'buy' ? 2 : 8,
      allowDecimalPadding: 'floats',
    });

    let pay: string = '0';

    const minOrder = parseFloat(announcement.minimum_order_size);
    const maxOrder = parseFloat(announcement.maximum_order_size);
    const receiveFloat =
      typeof sanitizedReceive === 'string'
        ? parseFloat(sanitizedReceive)
        : sanitizedReceive;

    switch (announcement.type) {
      case 'buy':
        pay = estimateBase(sanitizedReceive.toString(), d.price, '0.4');
        if (parseFloat(pay) > maxOrder || parseFloat(pay) < minOrder) {
          setErrorPay(true);
          setErrorReceive(true);
        }
        break;
      case 'sell':
        pay = estimateQuote(sanitizedReceive.toString(), d.price, '0.4');
        if (receiveFloat > maxOrder || receiveFloat < minOrder) {
          setErrorPay(true);
          setErrorReceive(true);
        }

        break;
    }

    setPay(pay);
  };

  const takeOrder = async () => {
    if (!session?.token) {
      navigate.push(`/auth/login?redirectTo=/p2p/announcements`);

      return;
    }

    const sanitizedAmount = Autonumeric.unformat(
      announcement.type === 'buy' ? pay : receive,
      {
        decimalPlaces: announcement.type === 'buy' ? 8 : 2,
        allowDecimalPadding: 'floats',
      },
    );

    const res = await p2pRepository.takeAnnouncement({
      body: {
        order_id: announcementId,
        amount_in_from_currency: sanitizedAmount.toString(),
      },
      token: session.token,
    });

    if (res.error && !res.data?.id) {
      toast.error(res.error);

      return;
    }

    navigate.push(`/p2p/orders/${res.data?.id}`);
  };

  useEffect(() => {
    if (!data || 'error' in data) {
      return;
    }

    if (lastModified === 'pay') {
      handlePay(pay);

      return;
    }

    handleReceive(receive);
  }, [data]);

  useEffect(() => {
    if (!isRefetching) {
      return;
    }

    setTimeLeft(timeRefetchingSeconds);
  }, [isFetched, isRefetching]);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (isLoading) {
    return <DialogContent>Cargando</DialogContent>;
  }

  if (data && 'error' in data) {
    return <DialogContent>asd</DialogContent>;
  }

  const announcement = data as Announcement;

  return (
    <DialogContent className='flex xl:min-w-[800px] p-0 overflow-hidden'>
      <aside className='flex-1 px-6 py-4 bg-black/50'>
        <span className='flex gap-3 py-4'>
          <PhotoProfile userId={announcement.user_id} className='size-10' />
          <p className='text-xl font-bold'>{announcement.user_alias}</p>
        </span>
        <div className='w-full py-6 border-t'>
          <article className='flex gap-3 justify-between'>
            <p className='text-muted-foreground font-medium'>{t('available')}</p>
            <p className='font-bold'>{announcement.amount}</p>
          </article>
          <article className='flex gap-3 justify-between'>
            <p className='text-muted-foreground font-medium'>{t('limits')}</p>
            <p className='font-bold'>{`$${announcement.minimum_order_size} ${announcement.quote.toUpperCase()} - ${announcement.maximum_order_size} ${announcement.quote.toUpperCase()}`}</p>
          </article>
          <article className='flex gap-3 justify-between'>
            <p className='text-muted-foreground font-medium'>{t('paymentDuration')}</p>
            <p className='font-bold'>
              {announcement.maximum_time_for_transaction_completion / 60} Min
            </p>
          </article>
          <article className='flex gap-3 justify-between'>
            <p className='text-muted-foreground font-medium'>{t('paymentMethod')}</p>
            <p className='font-bold'>
              {capitalizeSnakedWords(announcement.payment_method)}
            </p>
          </article>
        </div>
      </aside>
      <section className='flex-1 flex flex-col gap-3 px-4 py-12'>
        {announcement.price_type === 'variable' && (
          <p className='text-end'>
            {t('updateOn')} {createTimer(timeLeft)}
          </p>
        )}
        <InputWidget
          label={t('payLabel')}
          decimals={announcement.type === 'buy' ? 8 : 2}
          value={pay}
          onChange={(e) => handlePay(e.target.value)}
          error={errorPay}
          placeholder={
            announcement.type === 'buy'
              ? `${announcement.minimum_order_size} - ${announcement.maximum_order_size}`
              : ''
          }
        >
          <p className='absolute text-lg font-medium right-4 bottom-4 my-auto z-10'>
            {announcement.type === 'buy'
              ? announcement.base.toUpperCase()
              : announcement.quote.toUpperCase()}
          </p>
        </InputWidget>
        <InputWidget
          label={t('receiveLabel')}
          decimals={announcement.type === 'buy' ? 2 : 8}
          value={receive}
          error={errorReceive}
          onChange={(e) => handleReceive(e.target.value)}
        >
          <p className='absolute text-lg font-medium right-4 bottom-4 my-auto z-10'>
            {announcement.type === 'buy'
              ? announcement.quote.toUpperCase()
              : announcement.base.toUpperCase()}
          </p>
        </InputWidget>
        <span>
          <Alert variant={errorPay || errorReceive ? 'destructive' : 'default'}>
            <AlertTitle className='font-bold'>{t('limits')}</AlertTitle>
            <AlertDescription className='font-bold'>{`${announcement.minimum_order_size} - ${announcement.maximum_order_size} ${announcement.base.toUpperCase()}`}</AlertDescription>
          </Alert>
        </span>
        <span className='flex gap-3 pt-3'>
          <Button size='xl' className='flex-1' onClick={() => void takeOrder()}>
            {t(announcement.type === 'buy' ? 'sellAction' : 'buyAction')}
          </Button>
          <Button variant='outline' size='xl' className='flex-1'>
            <DialogClose>{tActions('cancel')}</DialogClose>
          </Button>
        </span>
      </section>
    </DialogContent>
  );
};

export default TakeAnnouncement;
