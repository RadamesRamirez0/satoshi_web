'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/tabs';
import useFiat from '@/modules/express/hooks/useExpress';

const BuyTab = () => {
  const t = useTranslations('BuySell');
  const { formik, handleReceive } = useFiat();

  return (
    <TabsContent value='buying'>
      <Card className='border-none'>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className='space-y-3 relative'>
            <InputWidget
              id='pay'
              label={t('buyingSpend')}
              value={formik.values.pay}
              onChange={formik.handleChange}
            >
              <Combobox
                small
                defaultLabel={formik.values.payCurrency}
                defaultValue={formik.values.payCurrency}
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={(v) => void formik.setFieldValue('payCurrency', v)}
              >
                <ComboboxItem value='MXN' subLabel='Mexican pesos'>
                  MXN
                </ComboboxItem>
              </Combobox>
            </InputWidget>
            <InputWidget
              id='receive'
              label={t('buyingReceive')}
              value={formik.values.receive}
              onChange={(e) => void handleReceive(e.currentTarget.value)}
            >
              <Combobox
                small
                defaultLabel={formik.values.receiveCurrency}
                defaultValue={formik.values.receiveCurrency}
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={(v) => void formik.setFieldValue('receiveCurrency', v)}
              >
                <ComboboxItem value='BTC' subLabel='Bitcoin'>
                  BTC
                </ComboboxItem>
              </Combobox>
            </InputWidget>
          </CardContent>
          <CardFooter>
            <Button className='w-full ' size='xl'>
              {t('buyingLoginSign')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default BuyTab;
