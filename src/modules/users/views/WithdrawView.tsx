import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import WithdrawForm from '@/modules/users/components/WithdrawForm';

const WithdrawView = async () => {
  const t = await getTranslations('Deposit');
  const t2 = await getTranslations('Withdraw');

  return (
    <div className='flex w-full h-full gap-32 pt-4'>
      <div className='flex flex-col gap-2 w-52'>
        <Button
          className='rounded-s-none justify-start'
          size='lg'
          variant='ghost'
          asChild
        >
          <Link href='/users/me/deposit'>
            <DownloadIcon className='w-5 h-5 mr-2' />
            {t('title')}
          </Link>
        </Button>
        <Button className='rounded-s-none justify-start' size='lg' asChild>
          <Link href='/users/me/withdraw'>
            <UploadIcon className='w-5 h-5 mr-2' />
            {t2('title')}
          </Link>
        </Button>
      </div>
      <div className='space-y-12'>
        <span className='space-y-2'>
          <h1 className='text-3xl font-bold'>{t2('title')}</h1>
          <p>{t2('subtitle')}</p>
        </span>
        <WithdrawForm />
      </div>
    </div>
  );
};

export default WithdrawView;
