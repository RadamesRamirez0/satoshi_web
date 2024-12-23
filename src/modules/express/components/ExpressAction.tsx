import { useTranslations } from 'next-intl';
import React from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Link, useRouter } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import { toast } from '@/modules/common/utils/toast';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';
import { p2pRepository } from '@/modules/p2p/repository';

export const ExpressAction = () => {
  const t = useTranslations('BuySell');
  const session = useSession();
  const router = useRouter();

  const {
    base,
    orderType,
    paymentMethod,
    pay,
    receive,
    quote,
    payCurrency,
    receiveCurrency,
  } = useExpressContext();

  const createOrder = () => {
    if (!session || !paymentMethod) {
      return;
    }

    void p2pRepository
      .createBuyOrder({
        token: session.token,
        body: {
          amount_in_from_currency: orderType === 'sell' ? pay : receive,
          order_type: orderType,
          from_currency_id: payCurrency?.id ?? '',
          to_currency_id: receiveCurrency?.id ?? '',
          payment_method_id: paymentMethod.id,
        },
      })
      .then((d) => {
        if (!d.data) {
          toast.error(d.error);

          return;
        }

        toast.success(t('orderCreated'));

        router.push(`/p2p/orders/${d.data.id}`);
      });
  };

  if (session?.user.email_is_verified && session.user.kyc_level === 1) {
    return (
      <Button
        className='w-full rounded-xl'
        size='xl'
        disabled={
          !paymentMethod ||
          !pay ||
          !receive ||
          !quote ||
          pay === '0' ||
          receive === '0' ||
          pay === '' ||
          receive === ''
        }
        onClick={() => createOrder()}
      >
        {`${t(orderType === 'buy' ? 'buy' : 'sell')} ${base}`}
      </Button>
    );
  }

  if (session?.user.email_is_verified === false) {
    return (
      <Button className='w-full rounded-xl' variant='orange' size='xl' asChild>
        <Link href='/users/me?verification=email'>{t('verifyEmail')}</Link>
      </Button>
    );
  }

  if (session?.user.phone_number_is_verified === false) {
    return (
      <Button className='w-full rounded-xl' variant='green' size='xl' asChild>
        <Link href='/users/me?verification=phone'>{t('verifyPhone')}</Link>
      </Button>
    );
  }

  if (session?.user.kyc_level === 0) {
    return (
      <Button className='w-full rounded-xl' variant='blue' size='xl' asChild>
        <Link href='/users/me/kyc'>{t('verifyIdentity')}</Link>
      </Button>
    );
  }

  return (
    <Button className='w-full rounded-xl' size='xl' asChild>
      <Link href='/auth/login'>{t('loginSign')}</Link>
    </Button>
  );
};
