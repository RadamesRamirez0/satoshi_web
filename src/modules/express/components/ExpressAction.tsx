import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Link } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import { User } from '@/modules/users/models/user';
import { usersRepository } from '@/modules/users/repository';

export const ExpressAction = () => {
  const [user, setUser] = useState<User>();
  const t = useTranslations('BuySell');
  const session = useSession();
  useEffect(() => {
    if (!session.token) {
      return;
    }
    void usersRepository.userMe({ token: session.token }).then((d) => {
      if (!d.data) {
        return;
      }

      setUser(d.data);
    });
  }, [session.token]);

  if (user?.email_is_verified && user.kyc_level === 1) {
    return (
      <Button className='w-full rounded-xl' variant='green' size='xl'>
        {t('selectPaymentMethod')}
      </Button>
    );
  }

  if (user?.email_is_verified === false) {
    return (
      <Button className='w-full rounded-xl' variant='orange' size='xl'>
        {t('verifyEmail')}
      </Button>
    );
  }

  if (user?.kyc_level === 0) {
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
