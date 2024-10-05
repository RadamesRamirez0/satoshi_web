import { useTranslations } from 'next-intl';
import React from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';

export const ExpressAction = () => {
  const t = useTranslations('BuySell');
  const session = useSession();

  if (session.token) {
    return (
      <Button className='w-full rounded-xl' variant='blue' size='xl'>
        {t('verifyIdentity')}
      </Button>
    );
  }

  return (
    <Button className='w-full rounded-xl' size='xl'>
      {t('loginSign')}
    </Button>
  );
};
