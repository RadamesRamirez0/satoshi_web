import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/modules/common/ui/components/widget-tabs';
import { BuySellContent } from '@/modules/express/components/BuySellContent';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const ExpressTab = () => {
  const t = useTranslations('BuySell');
  const { setOrderType, orderType } = useExpressContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type) {
      void setOrderType(type as 'buy' | 'sell');
    }
  }, [setOrderType]);

  return (
    <div className='md:w-[28rem] shrink-0'>
      {/* Terminal-style interface */}
      <div className='bg-black/90 border-2 border-zinc-700 relative overflow-hidden shadow-2xl'>
        {/* Terminal header bar */}
        <div className='bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <div className='flex-1 text-center'>
            <span className='text-zinc-400 text-sm font-mono'>satoshi-express</span>
          </div>
        </div>

        {/* Content area */}
        <div className='p-6'>
          {/* Command-style tab selector */}
          <div className='mb-6 font-mono text-sm'>
            <span className='text-primary'>$</span>
            <span className='text-zinc-400 ml-2'>execute --type=</span>
            <button
              onClick={() => void setOrderType('buy')}
              className={`mx-1 px-2 py-1 transition-all duration-200 ${
                orderType === 'buy'
                  ? 'bg-primary text-black rounded'
                  : 'text-zinc-400 hover:text-primary underline decoration-dotted'
              }`}
            >
              buy
            </button>
            <span className='text-zinc-600'>|</span>
            <button
              onClick={() => void setOrderType('sell')}
              className={`mx-1 px-2 py-1 transition-all duration-200 ${
                orderType === 'sell'
                  ? 'bg-red-500 text-white rounded'
                  : 'text-zinc-400 hover:text-red-400 underline decoration-dotted'
              }`}
            >
              sell
            </button>
          </div>

          <Tabs defaultValue='buy' value={orderType} className='w-full'>
            <BuySellContent type='buy' />
            <BuySellContent type='sell' />
          </Tabs>
        </div>

        {/* Scan lines effect */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none opacity-30'
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(192, 244, 68, 0.03) 2px, rgba(192, 244, 68, 0.03) 4px)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ExpressTab;
