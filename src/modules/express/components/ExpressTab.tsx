import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/modules/common/ui/components/tabs';

import BuyContent from './BuyContent';
import SellContent from './SellContent';

const BuySellTab = async () => {
  const t = await getTranslations('BuySell');

  return (
    <Tabs defaultValue='buying' className='w-[25rem]'>
      <div className='bg-card border-2 rounded-t-[1.62rem] rounded-b-3xl '>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='buying' className='clip-trapezoid-right'>
            {t('buying')}
          </TabsTrigger>
          <TabsTrigger value='selling' className='clip-trapezoid-left'>
            {t('selling')}
          </TabsTrigger>
        </TabsList>
        <BuyContent />
        <SellContent />
      </div>
    </Tabs>
  );
};

export default BuySellTab;
