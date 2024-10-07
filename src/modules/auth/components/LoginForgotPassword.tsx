import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/modules/common/i18n/routing';

const LoginForgotPassword = () => {
  const t = useTranslations('Login');

  return (
    <div className='flex justify-end'>
      <Link
        className='text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors'
        href='/auth/forgot-password'
      >
        {t('forgotPassword')}
      </Link>
    </div>
  );
};

export default LoginForgotPassword;
