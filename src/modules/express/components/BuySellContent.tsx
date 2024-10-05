'use client';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { TooltipWithIcon } from '@/modules/common/shared-ui/components/TooltipWithIcon';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/modules/common/ui/components/tooltip';
import { ExpressAction } from '@/modules/express/components/ExpressAction';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';
import { OrderType } from '@/modules/express/models/orderType';

export interface BuySellContent {
  type: OrderType;
}

export const BuySellContent: FC<BuySellContent> = ({ type }) => {
  let payDecimals = 2;
  let receiveDecimals = 8;

  if (type === 'sell') {
    payDecimals = 8;
    receiveDecimals = 2;
  }
  const t = useTranslations('BuySell');
  const {
    handlePay,
    handleReceive,
    pay,
    setPay,
    receive,
    setReceive,
    isErrorQuote,
    data,
    fiatCurrencies,
    cryptoCurrencies,
    payCurrency,
    receiveCurrency,
    setPayCurrency,
    setReceiveCurrency,
    base,
    quote,
  } = useExpressContext();

  return (
    <TabsContent value={type}>
      <Card className='border-none'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CardContent className='space-y-3 relative '>
            <InputWidget
              id='pay'
              label={t(type === 'buy' ? 'buyingSpend' : 'sellingSpend')}
              state={pay}
              setState={setPay}
              value={pay}
              decimals={payDecimals}
              onChange={(e) => void handlePay(e.target.value)}
              error={type === 'buy' ? isErrorQuote : false}
              placeholder={
                type === 'buy' && data
                  ? `Min ${data.minimum_order_amount} Max ${data.maximum_order_amount}`
                  : ''
              }
            >
              <Combobox
                small
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={setPayCurrency}
                value={payCurrency}
              >
                {(type === 'buy' ? fiatCurrencies : cryptoCurrencies)?.map((c) => (
                  <ComboboxItem key={c.id} value={c.id} subLabel={c.name}>
                    {c.symbol}
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
              placeholder={
                type === 'sell' && data
                  ? `Min ${data.minimum_order_amount} Max ${data.maximum_order_amount}`
                  : ''
              }
              error={type === 'sell' ? isErrorQuote : false}
            >
              <Combobox
                small
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={setReceiveCurrency}
                value={receiveCurrency}
              >
                {(type === 'buy' ? cryptoCurrencies : fiatCurrencies)?.map((c) => (
                  <ComboboxItem key={c.id} value={c.id} subLabel={c.name}>
                    {c.symbol}
                  </ComboboxItem>
                ))}
              </Combobox>
            </InputWidget>
          </CardContent>
          <CardFooter className='flex-col items-start space-y-2 pt-20'>
            <TooltipProvider>
              {data?.price && (
                <span className='flex gap-3 items-center'>
                  <Tooltip>
                    <TooltipWithIcon>{t('estimatedPrice')}</TooltipWithIcon>
                    <TooltipContent>{t('estimatedPriceTooltip')}</TooltipContent>
                  </Tooltip>
                  <p className='font-bold'>{`1 ${base} ≈ ${data.price} ${quote}`}</p>
                </span>
              )}
              {data?.fee_percentage && (
                <span className='pb-1'>
                  <Tooltip>
                    <TooltipWithIcon className='text-zinc-400'>
                      {t('feeRate')}
                    </TooltipWithIcon>
                    <TooltipContent>{t('feeRateTooltip')}</TooltipContent>
                    <p className='font-bold'>{data.fee_percentage}</p>
                  </Tooltip>
                </span>
              )}
            </TooltipProvider>
            <ExpressAction />
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
