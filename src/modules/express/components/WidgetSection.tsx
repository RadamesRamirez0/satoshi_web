'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import ExpressTab from '@/modules/express/components/ExpressTab';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const WidgetSection = () => {
  const t = useTranslations('BuySell');
  const { base, quote, orderType } = useExpressContext();

  return (
    <section className='md:pt-12 flex flex-col md:flex-row  justify-between items-center pb-32'>
      <article className='space-y-4'>
        <h1 className='text-2xl md:text-6xl font-black leading-none'>P2P Express</h1>
        <h2 className='text-2xl md:text-6xl font-black leading-none'>
          {t('title', { base, quote, type: orderType })}
        </h2>
        <p className='pb-2 md:pb-0 text-xl font-medium text-zinc-300'>
          {t('subtitle', { base })}
        </p>
      </article>
      <ExpressTab />
    </section>
  );
};

export default WidgetSection;
