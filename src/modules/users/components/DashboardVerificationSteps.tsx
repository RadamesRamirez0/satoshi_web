import { CheckIcon, TimerIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { CardGroup, CardGroupItem } from '@/modules/common/ui/components/card-group';

const DashboardVerificationSteps = () => {
  const t = useTranslations('Verification');

  const emailVerified = true;
  const kycVerified = false;

  let defaultValue = 1;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (emailVerified) {
    defaultValue = 2;
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (kycVerified) {
    defaultValue = 3;
  }

  return (
    <CardGroup defaultValue={defaultValue.toString()}>
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
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {emailVerified ? (
            <p className='text-lg text-green-500 font-bold flex items-center gap-1'>
              <CheckIcon className='size-6' />
              {t('completedStep')}
            </p>
          ) : (
            <Button asChild>
              <div>{t('step1Action')}</div>
            </Button>
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
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {kycVerified && (
            <p className='text-lg text-green-500 font-bold flex items-center gap-1'>
              <CheckIcon className='size-6' />
              {t('completedStep')}
            </p>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {emailVerified && !kycVerified && (
            <Button asChild>
              <div>{t('step2Action')}</div>
            </Button>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {!emailVerified && (
            <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
              <TimerIcon className='size-6' />
              {t('pendingStep')}
            </p>
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
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {emailVerified && kycVerified ? (
            <Button asChild>
              <div>{t('step3Action')}</div>
            </Button>
          ) : (
            <p className='text-lg text-zinc-500 font-bold flex items-center gap-1'>
              <TimerIcon className='size-6' />
              {t('pendingStep')}
            </p>
          )}
        </span>
      </CardGroupItem>
    </CardGroup>
  );
};

export default DashboardVerificationSteps;
