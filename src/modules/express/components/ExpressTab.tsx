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
    <Tabs defaultValue='buy' className='md:w-[28rem] shrink-0' value={orderType}>
      <div className='bg-card border-2 rounded-t-[1.62rem] rounded-b-3xl '>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value='buy'
            className='clip-trapezoid-right'
            onClick={() => void setOrderType('buy')}
          >
            {t('buy')}
          </TabsTrigger>
          <TabsTrigger
            value='sell'
            className='clip-trapezoid-left'
            onClick={() => void setOrderType('sell')}
          >
            {t('sell')}
          </TabsTrigger>
        </TabsList>
        <BuySellContent type='buy' />
        <BuySellContent type='sell' />
      </div>
    </Tabs>
  );
};

export default ExpressTab;
