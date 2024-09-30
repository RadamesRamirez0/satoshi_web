import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/tabs';

const SellTab = () => {
  const t = useTranslations('BuySell');

  return (
    <TabsContent value='selling'>
      <Card className='border-none'>
        <CardContent className='space-y-3'>
          <InputWidget
            id='spend'
            defaultValue='0'
            label={t('sellingSpend')}
            type='number'
          />
          <InputWidget
            id='receive'
            defaultValue='1'
            label={t('sellingReceive')}
            type='number'
          />
        </CardContent>
        <CardFooter>
          <Button className='w-full text-xl font-semibold' size='xl'>
            {t('sellingLoginSign')}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SellTab;
