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

  if (session?.user.email_is_verified && session.user.kyc_level > 0) {
    const isDisabled =
      !paymentMethod ||
      !pay ||
      !receive ||
      !quote ||
      pay === '0' ||
      receive === '0' ||
      pay === '' ||
      receive === '';

    return (
      <Button
        className={`w-full rounded-xl font-mono text-sm transition-all duration-300 ${
          orderType === 'buy'
            ? 'bg-gradient-to-r from-primary to-emerald-500 hover:from-emerald-500 hover:to-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/30'
            : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
        size='xl'
        disabled={isDisabled}
        onClick={() => createOrder()}
      >
        <span className='flex items-center gap-2'>
          <span className='text-xs'>{'>'}</span>
          {`execute ${orderType}_${base?.toLowerCase()}`}
        </span>
      </Button>
    );
  }

  if (session?.user.email_is_verified === false) {
    return (
      <Button
        className='w-full rounded-xl font-mono text-sm bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]'
        size='xl'
        asChild
      >
        <Link href='/users/me?verification=email'>
          <span className='flex items-center gap-2'>
            <span className='text-xs'>{'>'}</span>
            verify_email
          </span>
        </Link>
      </Button>
    );
  }

  if (session?.user.phone_number_is_verified === false) {
    return (
      <Button
        className='w-full rounded-xl font-mono text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02]'
        size='xl'
        asChild
      >
        <Link href='/users/me?verification=phone'>
          <span className='flex items-center gap-2'>
            <span className='text-xs'>{'>'}</span>
            verify_phone
          </span>
        </Link>
      </Button>
    );
  }

  if (session?.user.kyc_level === 0) {
    return (
      <Button
        className='w-full rounded-xl font-mono text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]'
        size='xl'
        asChild
      >
        <Link href='/users/me/kyc'>
          <span className='flex items-center gap-2'>
            <span className='text-xs'>{'>'}</span>
            verify_identity
          </span>
        </Link>
      </Button>
    );
  }

  let redirectTo = `/express/?type=${orderType}`;
  if (pay) {
    redirectTo += `&pay=${pay}`;
  }
  if (receive) {
    redirectTo += `&receive=${receive}`;
  }
  if (orderType === 'buy') {
    if (payCurrency?.id) {
      redirectTo += `&quote=${payCurrency.id}`;
    }
    if (receiveCurrency?.id) {
      redirectTo += `&base=${receiveCurrency.id}`;
    }
  }
  if (orderType === 'sell') {
    if (payCurrency?.id) {
      redirectTo += `&base=${payCurrency.id}`;
    }
    if (receiveCurrency?.id) {
      redirectTo += `&quote=${receiveCurrency.id}`;
    }
  }

  return (
    <Button
      className='w-full rounded-xl font-mono text-sm bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white border border-zinc-500 hover:border-primary/50 shadow-lg shadow-zinc-700/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02]'
      size='xl'
      asChild
    >
      <Link href={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`}>
        <span className='flex items-center gap-2'>
          <span className='text-xs'>{'>'}</span>
          login_required
        </span>
      </Link>
    </Button>
  );
};
