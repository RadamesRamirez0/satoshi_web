import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Dialog, DialogTrigger } from '@/modules/common/ui/components/dialog';
import { InputWidget } from '@/modules/common/ui/components/inputWidget';
import { TabsContent } from '@/modules/common/ui/components/widget-tabs';
import { ExpressAction } from '@/modules/express/components/ExpressAction';
import SelectPaymentMethod from '@/modules/express/components/SelectPaymentMethod';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';
import { OrderType } from '@/modules/express/models/orderType';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { p2pRepository } from '@/modules/p2p/repository';
import UserPaymentMethods from '@/modules/users/components/UserPaymentMethods';

export interface BuySellContent {
  type: OrderType;
}

export const BuySellContent: FC<BuySellContent> = ({ type }) => {
  const expressT = useTranslations('Express');
  const [selectingPayment, setSelectingPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  let payDecimals = 2;
  let receiveDecimals = 8;

  if (type === 'sell') {
    payDecimals = 8;
    receiveDecimals = 2;
  }

  const session = useSession();

  useEffect(() => {
    if (!session?.token) {
      return;
    }

    void p2pRepository.paymentMethods({ token: session.token }).then((methods) => {
      if (methods.error || !methods.data) {
        return;
      }
      setPaymentMethods(methods.data);
    });
  }, [session?.token]);

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
    userMethod,
    setUserMethod,
  } = useExpressContext();

  // Mock data for demo
  const mockData = {
    price: type === 'buy' ? '43,285.50' : '43,195.75',
    fee_percentage: '0.75',
    minimum_order_amount: type === 'buy' ? '50' : '0.001',
    maximum_order_amount: type === 'buy' ? '50,000' : '2.5',
  };

  const mockPayCurrency = payCurrency || {
    symbol: type === 'buy' ? 'USD' : 'BTC',
    name: type === 'buy' ? 'US Dollar' : 'Bitcoin',
  };
  const mockReceiveCurrency = receiveCurrency || {
    symbol: type === 'buy' ? 'BTC' : 'USD',
    name: type === 'buy' ? 'Bitcoin' : 'US Dollar',
  };
  const mockBase = base || 'BTC';
  const mockQuote = quote || 'USD';
  const mockPayValue = pay || (type === 'buy' ? '1,000.00' : '0.02315');
  const mockReceiveValue = receive || (type === 'buy' ? '0.02315' : '1,000.47');
  const mockPaymentMethod = paymentMethod || {
    name: type === 'buy' ? 'Bank Transfer (ACH)' : 'Coinbase Wallet',
  };

  return (
    <TabsContent value={type} className='mt-0 space-y-0'>
      <div className='space-y-4'>
        {/* Terminal-style inputs */}
        <div className='space-y-3 relative'>
          {/* Command prompt for pay */}
          <div className='space-y-2'>
            <div className='font-mono text-xs text-zinc-500'>
              <span className='text-primary'>{'>'}</span>{' '}
              {type === 'buy' ? expressT('setPayAmount') : expressT('setSellAmount')}
            </div>
            <div className='bg-zinc-900/50 border-l-4 border-primary/50 p-3 rounded-r-lg'>
              <InputWidget
                id='pay'
                label=''
                value={mockPayValue}
                decimals={payDecimals}
                onChange={(e) => {
                  setPay(e.target.value);
                  void handlePay(e.target.value);
                }}
                error={type === 'buy' ? isErrorQuote : false}
                placeholder={`Min ${mockData.minimum_order_amount} Max ${mockData.maximum_order_amount}`}
              >
                <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10'>
                  <span className='text-xs font-mono text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded'>
                    {mockPayCurrency.symbol}
                  </span>
                </div>
              </InputWidget>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className='flex justify-center'>
            <div className='text-zinc-600 font-mono text-lg'>↓</div>
          </div>

          {/* Command prompt for receive */}
          <div className='space-y-2'>
            <div className='font-mono text-xs text-zinc-500'>
              <span className='text-primary'>{'>'}</span> {expressT('calculateReceiving')}
            </div>
            <div className='bg-zinc-900/50 border-l-4 border-emerald-500/50 p-3 rounded-r-lg'>
              <InputWidget
                id='receive'
                label=''
                value={mockReceiveValue}
                decimals={receiveDecimals}
                onChange={(e) => {
                  setReceive(e.target.value);
                  void handleReceive(e.target.value);
                }}
                placeholder={`Min ${mockData.minimum_order_amount} Max ${mockData.maximum_order_amount}`}
                error={type === 'sell' ? isErrorQuote : false}
              >
                <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10'>
                  <span className='text-xs font-mono text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded'>
                    {mockReceiveCurrency.symbol}
                  </span>
                </div>
              </InputWidget>
            </div>
          </div>
        </div>

        {/* Terminal output */}
        <div className='bg-zinc-900/30 border border-zinc-700/50 rounded p-4 font-mono text-sm'>
          <div className='text-zinc-400'>
            <span className='text-zinc-600'>{expressT('rate')}</span> 1 {mockBase} ={' '}
            <span className='text-primary'>{mockData.price}</span> {mockQuote}
          </div>
          <div className='text-zinc-400 mt-1'>
            <span className='text-zinc-600'>{expressT('fee')}</span>{' '}
            <span className='text-orange-400'>{mockData.fee_percentage}%</span>
          </div>
          <div className='text-zinc-400 mt-1'>
            <span className='text-zinc-600'>{expressT('status')}</span>{' '}
            <span className='text-emerald-400'>{expressT('readyToTrade')}</span>
          </div>
        </div>

        {/* Terminal actions */}
        <div className='space-y-3'>
          <Dialog open={selectingPayment} onOpenChange={setSelectingPayment}>
            <DialogTrigger asChild>
              {session?.token && (
                <div className='bg-zinc-900/50 border border-zinc-700/50 rounded p-3 hover:border-primary/30 transition-colors duration-200 cursor-pointer'>
                  <div className='font-mono text-xs text-zinc-500 mb-1'>
                    <span className='text-primary'>{'>'}</span>{' '}
                    {expressT('selectPaymentMethod')}
                  </div>
                  <div className='text-zinc-300 text-sm'>{mockPaymentMethod.name}</div>
                </div>
              )}
            </DialogTrigger>
            {type === 'buy' && (
              <SelectPaymentMethod
                onSubmit={(p) => setPaymentMethod(p)}
                onClose={() => setSelectingPayment(false)}
              />
            )}
            {type === 'sell' && (
              <UserPaymentMethods
                onSubmit={(p) => setUserMethod(p)}
                onClose={() => setSelectingPayment(false)}
                modal
              />
            )}
          </Dialog>
          <ExpressAction />
        </div>
      </div>
    </TabsContent>
  );
};
