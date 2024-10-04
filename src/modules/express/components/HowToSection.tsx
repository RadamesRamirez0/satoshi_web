'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const HowToSection = () => {
  const t = useTranslations('HowTo');

  const { base, quote } = useExpressContext();

  return (
    <section className='flex flex-col gap-8'>
      <h2 className='text-5xl font-bold'>{t('mainTitle', { base })}</h2>
      <article className='flex w-full gap-4'>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/satoshi_logo.svg'
              alt='Satoshi Logo'
              width={119}
              height={31}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>{t('stepOneTitle')}</h3>
            <p>{t('stepOneContent', { base, quote })}</p>
          </CardContent>
        </Card>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/satoshi_logo.svg'
              alt='Satoshi Logo'
              width={119}
              height={31}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>{t('stepTwoTitle', { quote })}</h3>
            <p>{t('stepTwoContent')}</p>
          </CardContent>
        </Card>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/satoshi_logo.svg'
              alt='Satoshi Logo'
              width={119}
              height={31}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>{t('stepThreeTitle', { base })}</h3>
            <p>{t('stepThreeContent', { base })}</p>
          </CardContent>
        </Card>
      </article>
    </section>
  );
};

export default HowToSection;
