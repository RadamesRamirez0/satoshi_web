import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/modules/common/i18n/routing';

const LoginRegister = () => {
  const t = useTranslations('Login');

  return (
    <div>
      <Link
        href='/auth/register'
        className='text-primary/80 hover:text-primary text-sm font-semibold transition-colors'
      >
        {t('registerLabel')}
      </Link>
    </div>
  );
};

export default LoginRegister;
