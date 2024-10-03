'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import ExpressTab from '@/modules/express/components/ExpressTab';
import {
  ExpressContext,
  ExpressProvider,
} from '@/modules/express/contexts/ExpressContext';

const WidgetSection = () => {
  const t = useTranslations('BuySell');

  return (
    <ExpressProvider>
      <ExpressContext.Consumer>
        {({ orderType, base, quote }) => (
          <section className='pt-12 flex justify-between items-center pb-32'>
            <article className='space-y-4'>
              <h1 className='text-6xl font-black'>P2P Express</h1>
              <h2 className='text-6xl font-black'>
                {t(orderType)} {base.toUpperCase()} with {quote.toUpperCase()}
              </h2>
              <p className='text-xl font-medium text-zinc-300'>
                Buy and sell {base.toUpperCase()} on Satoshi P2P with various payment
                methods
              </p>
            </article>
            <ExpressTab />
          </section>
        )}
      </ExpressContext.Consumer>
    </ExpressProvider>
  );
};

export default WidgetSection;
