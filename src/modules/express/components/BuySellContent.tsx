import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

import { TooltipWithIcon } from '@/modules/common/shared-ui/components/TooltipWithIcon';
import { Button } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardFooter } from '@/modules/common/ui/components/card';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { Dialog, DialogTrigger } from '@/modules/common/ui/components/dialog';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/modules/common/ui/components/tooltip';
import { TabsContent } from '@/modules/common/ui/components/widget-tabs';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import { ExpressAction } from '@/modules/express/components/ExpressAction';
import SelectPaymentMethod from '@/modules/express/components/SelectPaymentMethod';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';
import { OrderType } from '@/modules/express/models/orderType';
import UserPaymentMethods from '@/modules/users/components/UserPaymentMethods';

export interface BuySellContent {
  type: OrderType;
}

export const BuySellContent: FC<BuySellContent> = ({ type }) => {
  const [selectingPayment, setSelectingPayment] = useState(false);
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
    setReceive,
    receive,
    setPay,
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
    setPaymentMethod,
    paymentMethod,
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
              value={pay}
              decimals={payDecimals}
              onChange={(e) => {
                setPay(e.target.value);
                void handlePay(e.target.value);
              }}
              error={type === 'buy' ? isErrorQuote : false}
              placeholder={
                type === 'sell' && data
                  ? `Min ${data.minimum_order_amount} Max ${data.maximum_order_amount}`
                  : ''
              }
            >
              <Combobox
                id='payCurrency'
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={setPayCurrency}
                value={payCurrency}
                align='end'
                label={payCurrency?.symbol}
              >
                {(type === 'buy' ? fiatCurrencies : cryptoCurrencies)?.map((c) => (
                  <ComboboxItem key={c.id} value={c} subLabel={c.name}>
                    {c.symbol}
                  </ComboboxItem>
                ))}
              </Combobox>
            </InputWidget>
            <InputWidget
              id='receive'
              label={t('buyingReceive')}
              value={receive}
              decimals={receiveDecimals}
              onChange={(e) => {
                setReceive(e.target.value);
                void handleReceive(e.target.value);
              }}
              placeholder={
                type === 'buy' && data
                  ? `Min ${data.minimum_order_amount} Max ${data.maximum_order_amount}`
                  : ''
              }
              error={type === 'sell' ? isErrorQuote : false}
            >
              <Combobox
                id='receiveCurrency'
                dropDownClassName='w-full'
                triggerClassName='absolute right-4 top-0 bottom-0 m-auto z-10'
                onChange={setReceiveCurrency}
                value={receiveCurrency}
                label={receiveCurrency?.symbol}
                align='end'
              >
                {(type === 'buy' ? cryptoCurrencies : fiatCurrencies)?.map((c) => (
                  <ComboboxItem key={c.id} value={c} subLabel={c.name}>
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
                <span className='flex gap-3 items-center pb-1'>
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
            <Dialog open={selectingPayment} onOpenChange={setSelectingPayment}>
              <DialogTrigger asChild>
                <Button
                  className='w-full text-lg py-6 h-min justify-start rounded-xl'
                  variant='outline'
                >
                  {paymentMethod
                    ? capitalizeSnakedWords(paymentMethod)
                    : t('selectPaymentMethod')}
                </Button>
              </DialogTrigger>
              {type === 'buy' && (
                <SelectPaymentMethod
                  onSubmit={(p) => setPaymentMethod(p.id)}
                  onClose={() => setSelectingPayment(false)}
                />
              )}
              {type === 'sell' && (
                <UserPaymentMethods
                  onSubmit={(p) => setPaymentMethod(p.payment_method_id)}
                  onClose={() => setSelectingPayment(false)}
                  modal
                />
              )}
            </Dialog>
            <ExpressAction />
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
