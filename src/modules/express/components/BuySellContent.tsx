'use client';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/tabs';
import { baseCurrencies, fiatCurrencies } from '@/modules/cripto/constants/currencies';
import useExpress from '@/modules/express/hooks/useExpress';
import { OrderType } from '@/modules/express/models/orderType';

export interface BuySellContent {
  type: OrderType;
}

export const BuySellContent: FC<BuySellContent> = ({ type }) => {
  let payCurrencies: string[] = fiatCurrencies;
  let receiveCurrencies: string[] = baseCurrencies;
  let payDecimals = 2;
  let receiveDecimals = 8;

  if (type === 'sell') {
    payCurrencies = baseCurrencies;
    receiveCurrencies = fiatCurrencies;
    payDecimals = 8;
    receiveDecimals = 2;
  }
  const t = useTranslations('BuySell');
  const { formik, pay, receive, setPay, setReceive, handlePay, handleReceive } =
    useExpress({
      initialValues: {
        pay: '100',
        payCurrency: payCurrencies[0],
        receive: '',
        receiveCurrency: receiveCurrencies[0],
      },
      orderType: type,
    });

  return (
    <TabsContent value={type}>
      <Card className='border-none'>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className='space-y-3 relative'>
            <InputWidget
              id='pay'
              label={t('buyingSpend')}
              state={pay}
              setState={setPay}
              value={pay}
              decimals={payDecimals}
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
                {payCurrencies.map((c) => (
                  <ComboboxItem key={c} value={c} subLabel='Mexican pesos'>
                    {c}
                  </ComboboxItem>
                ))}
              </Combobox>
            </InputWidget>
            <InputWidget
              id='receive'
              label={t('buyingReceive')}
              state={receive}
              value={receive}
              setState={setReceive}
              decimals={receiveDecimals}
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
                {receiveCurrencies.map((c) => (
                  <ComboboxItem key={c} value={c} subLabel='Mexican pesos'>
                    {c}
                  </ComboboxItem>
                ))}
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
