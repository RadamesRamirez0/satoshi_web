'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/tabs';
import useExpress from '@/modules/express/hooks/useExpress';

const BuyTab = () => {
  const t = useTranslations('BuySell');
  const { formik, pay, receive, setPay, setReceive, handlePay, handleReceive } =
    useExpress({
      pay: '100',
      payCurrency: 'MXN',
      receive: '',
      receiveCurrency: 'BTC',
    });

  return (
    <TabsContent value='buying'>
      <Card className='border-none'>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className='space-y-3 relative'>
            <InputWidget
              id='pay'
              label={t('buyingSpend')}
              state={pay}
              setState={setPay}
              value={pay}
              onChange={(e) => void handlePay(e.target.value)}
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
              state={receive}
              value={receive}
              setState={setReceive}
              decimals={8}
              onChange={(e) => void handleReceive(e.target.value)}
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
