'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import ExpressTab from '@/modules/express/components/ExpressTab';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const WidgetSection = () => {
  const t = useTranslations('BuySell');
  const { base, quote, orderType } = useExpressContext();

  return (
    <>
      {/* Full viewport background gradient */}
      <div className='fixed inset-0 -z-10 pointer-events-none'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/15 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-500/10 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse delay-2000'></div>
        <div className='absolute top-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/8 via-primary/8 to-transparent rounded-full blur-3xl animate-pulse delay-3000'></div>
      </div>

      <section className='relative md:pt-12 flex flex-col md:flex-row justify-between items-center pb-32'>
        <article className='space-y-6 animate-fade-in-up'>
          <div className='relative'>
            <h1 className='text-2xl md:text-6xl font-black leading-none md:leading-normal bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent animate-fade-in-up'>
              P2P Express
            </h1>
            {/* Glowing accent line */}
            <div className='h-1 w-24 md:w-32 bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full mt-2 animate-shimmer'></div>
          </div>

          <h2 className='text-2xl md:text-6xl font-black leading-none md:leading-normal bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent animate-fade-in-up delay-200'>
            {t('title', { base, quote, type: orderType })}
          </h2>

          <p className='pb-2 md:pb-0 text-xl font-medium text-zinc-300 animate-fade-in-up delay-300 max-w-lg leading-relaxed'>
            {t('subtitle', { base })}
          </p>

          {/* Floating elements for visual appeal */}
          <div className='flex gap-4 pt-4 animate-fade-in-up delay-500'>
            <div className='px-4 py-2 bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 rounded-full backdrop-blur-sm'>
              <span className='text-sm font-semibold text-primary'>Lightning Fast</span>
            </div>
            <div className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-primary/20 border border-blue-500/30 rounded-full backdrop-blur-sm'>
              <span className='text-sm font-semibold text-blue-300'>Secure P2P</span>
            </div>
          </div>
        </article>

        <div className='animate-fade-in-up delay-700'>
          <ExpressTab />
        </div>
      </section>
    </>
  );
};

export default WidgetSection;
