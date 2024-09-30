import { useTranslations } from 'next-intl';
import React from 'react';

const LoginForgotPassword = () => {
  const t = useTranslations('Login');

  return (
    <div className='flex justify-end'>
      <a
        className='text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors'
        href='/3'
      >
        {t('forgotPassword')}
      </a>
    </div>
  );
};

export default LoginForgotPassword;
