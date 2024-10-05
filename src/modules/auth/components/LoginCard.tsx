import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getSession } from '@/app/api/auth/lib/session';
import LoginForm from '@/modules/auth/components/LoginForm';
import LoginRegister from '@/modules/auth/components/LoginRegister';
import { redirect } from '@/modules/common/i18n/routing';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/modules/common/ui/components/card';
import { getRedirect } from '@/modules/common/utils/getRedirect';

const LoginCard = async () => {
  const t = await getTranslations('Login');
  const session = getSession();
  if (session) {
    redirect('/');
  }

  const redirectTo = getRedirect('auth');

  return (
    <Card className='px-6 min-w-[25rem] border py-6'>
      <CardHeader className='flex flex-col space-y-10'>
        <Image src='/svg/satoshi_logo.svg' width={175} height={10} alt='Satoshi Logo' />
        <h1 className='text-3xl font-semibold'>{t('title')}</h1>
      </CardHeader>
      <CardContent className='pt-2'>
        <LoginForm redirectTo={redirectTo} />
      </CardContent>
      <CardFooter className='flex-col items-start'>
        <LoginRegister />
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
