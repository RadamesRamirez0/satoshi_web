import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import LoginForm from '@/modules/auth/components/LoginForm';
import LoginRegister from '@/modules/auth/components/LoginRegister';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/modules/common/ui/components/card';

const LoginCard = () => {
  const t = useTranslations('Login');

  return (
    <Card className='px-6 min-w-[25rem] border py-6'>
      <CardHeader className='flex flex-col space-y-10'>
        <Image src='/svg/satoshi_logo.svg' width={175} height={10} alt='Satoshi Logo' />
        <h1 className='text-3xl font-semibold'>{t('title')}</h1>
      </CardHeader>
      <CardContent className='pt-2'>
        <LoginForm />
      </CardContent>
      <CardFooter className='flex-col items-start'>
        <LoginRegister />
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
