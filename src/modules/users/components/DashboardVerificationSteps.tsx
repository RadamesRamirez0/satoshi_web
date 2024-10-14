import { CheckIcon, TimerIcon } from '@radix-ui/react-icons';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import { Button } from '@/modules/common/ui/components/button';
import { CardGroup, CardGroupItem } from '@/modules/common/ui/components/card-group';
import { cn } from '@/modules/common/ui/lib/utils';
import { usersRepository } from '@/modules/users/repository';

const DashboardVerificationSteps = async () => {
  const t = await getTranslations('Verification');

  const session = await getSession();

  const user = await usersRepository.userMe({
    token: session?.token ?? '',
  });

  const currentValue = !user.data?.email_is_verified
    ? '1'
    : user.data.kyc_level === 0
      ? '2'
      : '3';

  return (
    <CardGroup defaultValue={currentValue} className='grid grid-cols-12'>
      <CardGroupItem
        value='1'
        id='step1'
        className='col-span-3 data-[state=checked]:col-span-6 flex gap-4'
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

          {user.data?.email_is_verified ? (
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
                <div>{t('step1Action')}</div>
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
        value='2'
        id='step2'
        className='col-span-3 data-[state=checked]:col-span-6 flex gap-4'
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

          {user.data?.kyc_level === 1 ? (
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
                <div>{t('step2Action')}</div>
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
        value='3'
        id='step3'
        className='col-span-3 data-[state=checked]:col-span-6 flex gap-4'
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
          <span
            className={cn(
              'flex justify-between w-full flex-col items-start group-data-[state=checked]:items-center group-data-[state=checked]:flex-row gap-3',
            )}
          >
            {user.data?.email_is_verified && user.data.kyc_level === 1 && (
              <Button asChild>
                <div>{t('step3Action')}</div>
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
