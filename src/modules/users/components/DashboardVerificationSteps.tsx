'use client';

import { CheckIcon, TimerIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Link } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import { CardGroup, CardGroupItem } from '@/modules/common/ui/components/card-group';
import { Dialog, DialogTrigger } from '@/modules/common/ui/components/dialog';
import { cn } from '@/modules/common/ui/lib/utils';
import EmailOTP from '@/modules/users/components/EmailOTP';
import PhoneOTP from '@/modules/users/components/PhoneOTP';
import { usersRepository } from '@/modules/users/repository';
import { UserMeResponse } from '@/modules/users/repository/dtos/userMeDto';

const DashboardVerificationSteps = () => {
  const params = useSearchParams();
  const t = useTranslations('Verification');
  const [user, setUser] = useState<UserMeResponse>();
  const [openEmail, setOpenEmail] = useState(false);
  const [open, setOpen] = useState(false);

  const session = useSession();

  const getMe = async () => {
    const user = await usersRepository.userMe({
      token: session?.token ?? '',
    });

    setUser(user);
  };

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    void getMe();
  }, [session?.token]);

  useEffect(() => {
    const verification = params.get('verification');

    if (!verification) {
      return;
    }

    if (verification === 'email' && !user?.data?.email_is_verified) {
      setOpenEmail(true);

      return;
    }

    if (verification === 'phone' && !user?.data?.phone_number_is_verified) {
      setOpen(true);

      return;
    }
  }, [params]);

  const currentValue = !user?.data?.email_is_verified
    ? '1'
    : !user.data.phone_number_is_verified
      ? '2'
      : user.data.kyc_level === 0
        ? '3'
        : '4';

  return (
    <CardGroup defaultValue={currentValue} className='grid grid-cols-12'>
      <CardGroupItem
        value='1'
        id='step1'
        className='col-span-12 md:col-span-2 md:data-[state=checked]:col-span-6 flex gap-4'
      >
        <span className='flex flex-col text-left  items-start justify-between gap-8 w-full h-full'>
          <p className='text-xl font-bold block group-data-[state=checked]:hidden'>
            {t('step1Title')}
          </p>
          <div>
            <p className='text-xl font-bold hidden group-data-[state=checked]:block'>
              {t('step1CompleteTitle')}
            </p>
            <p className='hidden group-data-[state=checked]:block'>{t('step1Body')}</p>
          </div>

          {user?.data?.email_is_verified ? (
            <p className='text-lg text-green-500 font-bold flex items-center  gap-1'>
              <CheckIcon className='size-6' />
              {t('completedStep')}
            </p>
          ) : (
            <span
              className={cn(
                'flex justify-between w-full flex-col items-start group-data-[state=checked]:items-center group-data-[state=checked]:flex-row gap-3',
              )}
            >
              <Dialog open={openEmail} onOpenChange={setOpenEmail}>
                <DialogTrigger asChild>
                  <Button asChild onClick={() => {}}>
                    <div>{t('step1Action')}</div>
                  </Button>
                </DialogTrigger>
                <EmailOTP isOpen={openEmail} />
              </Dialog>
              <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
                <TimerIcon className='size-6' />
                {t('pendingStep')}
              </p>
            </span>
          )}
        </span>
      </CardGroupItem>
      <CardGroupItem
        value='2'
        id='step2'
        className='col-span-12 md:col-span-2 md:data-[state=checked]:col-span-6 flex gap-4'
      >
        <span className='flex flex-col text-left  items-start justify-between gap-8 w-full h-full'>
          <p className='text-xl font-bold block group-data-[state=checked]:hidden'>
            {t('step2Title')}
          </p>
          <div>
            <p className='text-xl font-bold hidden group-data-[state=checked]:block'>
              {t('step2CompleteTitle')}
            </p>
            <p className='hidden group-data-[state=checked]:block'>{t('step2Body')}</p>
          </div>

          {user?.data?.phone_number_is_verified ? (
            <p className='text-lg text-green-500 font-bold flex items-center gap-1'>
              <CheckIcon className='size-6' />
              {t('completedStep')}
            </p>
          ) : (
            <span
              className={cn(
                'flex justify-between w-full flex-col items-start group-data-[state=checked]:items-center group-data-[state=checked]:flex-row gap-3',
              )}
            >
              <Dialog
                open={open}
                onOpenChange={(v) => {
                  if (!v) {
                    void getMe();
                  }
                  setOpen(v);
                }}
              >
                <DialogTrigger asChild>
                  <Button asChild>
                    <div>{t('step2Action')}</div>
                  </Button>
                </DialogTrigger>
                <PhoneOTP postSubmit={() => setOpen(false)} />
              </Dialog>

              <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
                <TimerIcon className='size-6' />
                {t('pendingStep')}
              </p>
            </span>
          )}
        </span>
      </CardGroupItem>
      <CardGroupItem
        value='3'
        id='step3'
        className='col-span-12 md:col-span-2 md:data-[state=checked]:col-span-6 flex gap-4'
      >
        <span className='flex flex-col text-left  items-start justify-between gap-8 w-full h-full'>
          <p className='text-xl font-bold block group-data-[state=checked]:hidden'>
            {t('step3Title')}
          </p>
          <div>
            <p className='text-xl font-bold hidden group-data-[state=checked]:block'>
              {t('step3CompleteTitle')}
            </p>
            <p className='hidden group-data-[state=checked]:block'>{t('step3Body')}</p>
          </div>

          {user?.data?.kyc_level === 1 ? (
            <p className='text-lg text-green-500 font-bold flex items-center gap-1'>
              <CheckIcon className='size-6' />
              {t('completedStep')}
            </p>
          ) : (
            <span
              className={cn(
                'flex justify-between w-full flex-col items-start group-data-[state=checked]:items-center group-data-[state=checked]:flex-row gap-3',
              )}
            >
              <Button asChild>
                <Link href='/users/me/kyc'>
                  <div>{t('step3Action')}</div>
                </Link>
              </Button>

              <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
                <TimerIcon className='size-6' />
                {t('pendingStep')}
              </p>
            </span>
          )}
        </span>
      </CardGroupItem>
      <CardGroupItem
        value='4'
        id='step4'
        className='col-span-12 md:col-span-2 md:data-[state=checked]:col-span-6 flex gap-4'
      >
        <span className='flex flex-col text-left  items-start justify-between gap-8 w-full h-full'>
          <p className='text-xl font-bold block group-data-[state=checked]:hidden'>
            {t('step4Title')}
          </p>
          <div>
            <p className='text-xl font-bold hidden group-data-[state=checked]:block'>
              {t('step4CompleteTitle')}
            </p>
            <p className='hidden group-data-[state=checked]:block'>{t('step4Body')}</p>
          </div>
          <span
            className={cn(
              'flex justify-between w-full flex-col items-start group-data-[state=checked]:items-center group-data-[state=checked]:flex-row gap-3',
            )}
          >
            {user?.data?.email_is_verified && user.data.kyc_level === 1 && (
              <Button asChild>
                <Link href='/express'>
                  <div>{t('step4Action')}</div>
                </Link>
              </Button>
            )}

            {
              <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
                <TimerIcon className='size-6' />
                {t('pendingStep')}
              </p>
            }
          </span>
        </span>
      </CardGroupItem>
    </CardGroup>
  );
};

export default DashboardVerificationSteps;
