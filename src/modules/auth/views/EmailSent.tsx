import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/modules/common/i18n/routing';

const EmailSentView = async () => {
  const t = await getTranslations('ForgotPassword');

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold'>{t('emailSent')}</h1>
        <p className='text-xl pb-8'>{t('emailSentDescription')}</p>

        <Link href='/auth/login' className=''>
          <span>
            <ArrowLeftIcon className='inline-block w-4 h-4 mr-2' />
            {t('backToLogin')}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EmailSentView;
