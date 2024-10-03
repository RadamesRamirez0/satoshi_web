import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/modules/common/ui/components/tabs';
import { BuySellContent } from '@/modules/express/components/BuySellContent';

const ExpressTab = async () => {
  const t = await getTranslations('BuySell');

  return (
    <Tabs defaultValue='buy' className='w-[25rem]'>
      <div className='bg-card border-2 rounded-t-[1.62rem] rounded-b-3xl '>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='buy' className='clip-trapezoid-right'>
            {t('buying')}
          </TabsTrigger>
          <TabsTrigger value='sell' className='clip-trapezoid-left'>
            {t('selling')}
          </TabsTrigger>
        </TabsList>
        <BuySellContent type='buy' />
        <BuySellContent type='sell' />
      </div>
    </Tabs>
  );
};

export default ExpressTab;
