'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import ExpressTab from '@/modules/express/components/ExpressTab';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const WidgetSection = () => {
  const t = useTranslations('BuySell');
  const { base, quote, orderType } = useExpressContext();

  return (
    <section className='pt-12 flex justify-between items-center pb-32'>
      <article className='space-y-4'>
        <h1 className='text-6xl font-black'>P2P Express</h1>
        <h2 className='text-6xl font-black leading-normal'>
          {t('title', { base, quote, type: orderType })}
        </h2>
        <p className='text-xl font-medium text-zinc-300'>{t('subtitle', { base })}</p>
      </article>
      <ExpressTab />
    </section>
  );
};

export default WidgetSection;
