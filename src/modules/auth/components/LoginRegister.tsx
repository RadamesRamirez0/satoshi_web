import { useTranslations } from 'next-intl';
import React from 'react';

const LoginRegister = () => {
  const t = useTranslations('Login');

  return (
    <div>
      <a
        href='#/a'
        className='text-primary/80 hover:text-primary text-sm font-semibold transition-colors'
      >
        {t('registerLabel')}
      </a>
    </div>
  );
};

export default LoginRegister;
