import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getSession } from '@/app/api/auth/lib/session';
import RegisterForm from '@/modules/auth/components/RegisterForm';
import { redirect } from '@/modules/common/i18n/routing';
import { Card, CardContent, CardHeader } from '@/modules/common/ui/components/card';
import { getRedirect } from '@/modules/common/utils/getRedirect';

const RegisterCard = async () => {
  const session = getSession();
  const t = await getTranslations('Register');
  if (session) {
    redirect('/');
  }

  const redirectTo = getRedirect('auth');

  return (
    <Card className='px-6 sm:w-[25rem]  border py-6'>
      <CardHeader className='flex flex-col space-y-10'>
        <Image src='/svg/satoshi_logo.svg' width={175} height={10} alt='Satoshi Logo' />
        <h1 className='text-3xl font-semibold'>{t('title')}</h1>
      </CardHeader>
      <CardContent className='pt-2'>
        <RegisterForm redirectTo={redirectTo} />
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
