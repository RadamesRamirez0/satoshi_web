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

const LoginCard = async ({ redirectTo }: { redirectTo?: string }) => {
  const t = await getTranslations('Login');
  const session = getSession();
  if (session) {
    redirect('/');
  }

  return (
    <Card className='px-6 w-full mx-2 md:w-auto md:mx-0 md:min-w-[25rem] border py-6'>
      <CardHeader className='flex flex-col space-y-10'>
        <Image
          src='/svg/satoshi_logo.svg'
          width={119}
          height={31}
          alt='Satoshi Logo'
          className='flex-1'
        />
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
