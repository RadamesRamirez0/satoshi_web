import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import RegisterForm from '@/modules/auth/components/RegisterForm';
import { Card, CardContent, CardHeader } from '@/modules/common/ui/components/card';

const RegisterCard = () => {
  const t = useTranslations('Register');

  return (
    <Card className='px-6 sm:w-[25rem] x border py-6'>
      <CardHeader className='flex flex-col space-y-10'>
        <Image src='/svg/satoshi_logo.svg' width={175} height={10} alt='Satoshi Logo' />
        <h1 className='text-3xl font-semibold'>{t('title')}</h1>
      </CardHeader>
      <CardContent className='pt-2'>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
