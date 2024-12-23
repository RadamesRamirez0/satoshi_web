'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const HowToSection = () => {
  const t = useTranslations('HowTo');

  const { base, quote, orderType } = useExpressContext();

  return (
    <section className='flex flex-col gap-8'>
      <h2 className='text-5xl font-bold'>{t(`${orderType}MainTitle`, { base })}</h2>
      <article className='flex flex-col md:flex-row w-full gap-4'>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/buyStep1.svg'
              alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 1'
              width={960}
              height={540}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>{t(`${orderType}StepOneTitle`)}</h3>
            <p>{t(`${orderType}StepOneContent`, { base, quote })}</p>
          </CardContent>
        </Card>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/buyStep2.svg'
              alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 2'
              width={960}
              height={540}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>
              {t(`${orderType}StepTwoTitle`, { quote, base })}
            </h3>
            <p>{t(`${orderType}StepTwoContent`, { quote })}</p>
          </CardContent>
        </Card>
        <Card className='flex-1'>
          <CardContent className='space-y-6 pt-8 pb-12'>
            <Image
              src='/svg/buyStep3.svg'
              alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 3'
              width={960}
              height={540}
              className='w-full'
            />
            <h3 className='text-xl font-bold'>
              {t(`${orderType}StepThreeTitle`, { base })}
            </h3>
            <p>{t(`${orderType}StepThreeContent`, { base, quote })}</p>
          </CardContent>
        </Card>
      </article>
    </section>
  );
};

export default HowToSection;
