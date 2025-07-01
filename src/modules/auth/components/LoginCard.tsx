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
    <div className='relative group'>
      {/* Glow effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-emerald-400/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50'></div>

      <Card className='relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/95 backdrop-blur-xl border-2 border-zinc-700/50 rounded-3xl shadow-2xl w-full md:min-w-[28rem] overflow-hidden'>
        {/* Terminal-style header */}
        <div className='bg-zinc-800/60 px-6 py-4 border-b border-zinc-700/50'>
          <div className='flex items-center gap-3'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <span className='text-zinc-400 text-sm font-mono'>satoshi-auth</span>
          </div>
        </div>

        <CardHeader className='flex flex-col space-y-8 p-8'>
          <div className='flex justify-center'>
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <Image
                src='/svg/satoshi_logo.svg'
                width={140}
                height={36}
                alt='Satoshi Logo'
                className='relative filter brightness-110'
              />
            </div>
          </div>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-black bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent'>
              {t('title')}
            </h1>
            <div className='font-mono text-sm text-zinc-500'>
              <span className='text-primary'>{'>'}</span> initialize_session
            </div>
          </div>
        </CardHeader>

        <CardContent className='px-8'>
          <LoginForm redirectTo={redirectTo} />
        </CardContent>

        <CardFooter className='px-8 pb-8'>
          <LoginRegister />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCard;
