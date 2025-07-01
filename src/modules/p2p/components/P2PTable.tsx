'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { PopoverClose } from '@radix-ui/react-popover';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/modules/common/ui/components/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/common/ui/components/popover';
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/common/ui/components/table';
import { Tabs, TabsList, TabsTrigger } from '@/modules/common/ui/components/tabs';
import { Currency } from '@/modules/cripto/models/currency';
import { OrderType } from '@/modules/express/models/orderType';
import {
  AdvertiserCell,
  AvailableCell,
  PaymentCell,
  PriceCell,
  TradeCell,
} from '@/modules/p2p/components/P2PTableCells';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';

export const P2PTable: FC = () => {
  const t = useTranslations('P2PView');
  const p2pT = useTranslations('P2PTable');
  const [orderType, setOrderType] = useState<OrderType>('buy');
  const [base, setBase] = useState<Currency>();
  const [quote, setQuote] = useState<Currency>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [refreshTime, setRefreshTime] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<
    'price' | 'minimum_order_size' | 'maximum_order_size'
  >('price');

  // Mock data for demo
  const mockCurrencies: Currency[] = [
    {
      id: '1',
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      type: 'crypto',
      description: 'Bitcoin',
      precision: 8,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
    {
      id: '2',
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      type: 'crypto',
      description: 'Ethereum',
      precision: 8,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
    {
      id: '3',
      name: 'USDT',
      symbol: 'USDT',
      type: 'crypto',
      description: 'Tether',
      precision: 6,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
    {
      id: '4',
      name: 'Peso Mexicano (MXN)',
      symbol: 'MXN',
      type: 'fiat',
      description: 'Mexican Peso',
      precision: 2,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
    {
      id: '5',
      name: 'US Dollar (USD)',
      symbol: 'USD',
      type: 'fiat',
      description: 'US Dollar',
      precision: 2,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
    {
      id: '6',
      name: 'Euro (EUR)',
      symbol: 'EUR',
      type: 'fiat',
      description: 'Euro',
      precision: 2,
      deposits_enable: 1,
      withdrawals_enable: 1,
    },
  ];

  const mockPaymentMethods = {
    data: [
      { id: '1', name: 'SPEI Transfer', enable: true },
      { id: '2', name: 'Mercado Pago', enable: true },
      { id: '3', name: 'Oxxo Pay', enable: true },
      { id: '4', name: 'BBVA Transfer', enable: true },
      { id: '5', name: 'Banorte Transfer', enable: true },
      { id: '6', name: 'Wise Transfer', enable: true },
    ],
  };

  // Mock data instead of API call for demo
  const data: { data?: any } | null = null;
  const isLoading = false;

  // Using mock data for demo
  const currencies = mockCurrencies;
  const paymentMethods = mockPaymentMethods;
  const loadingCurrencies = false;
  const loadingMethods = false;

  useEffect(() => {
    // Set default values only once
    if (!base && currencies.length > 0) {
      setBase(currencies.filter((c) => c.type === 'crypto')[0]);
    }
    if (!quote && currencies.length > 0) {
      setQuote(currencies.filter((c) => c.type === 'fiat')[0]);
    }
  }, []); // Empty dependency array to run only once

  return (
    <div className='bg-gradient-to-b from-zinc-900/60 to-zinc-800/80 backdrop-blur-xl border border-zinc-700/50 p-6 rounded-2xl mt-8 overflow-x-auto shadow-2xl'>
      <section className='flex gap-4 items-center mb-6'>
        <span className='flex gap-3 items-center'>
          <Tabs value={orderType} onValueChange={(v) => setOrderType(v as OrderType)}>
            <TabsList className='h-auto p-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl'>
              <TabsTrigger
                value='buy'
                className='data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 text-lg font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-emerald-500/10'
              >
                {t('buy')}
              </TabsTrigger>
              <TabsTrigger
                value='sell'
                className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30 text-lg font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-red-500/10'
              >
                {t('sell')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Combobox
            id='base'
            variant='secondary'
            loading={loadingCurrencies}
            onChange={setBase}
            value={base}
            defaultLabel={t('selectBase')}
            label={base?.symbol || base?.name}
            triggerClassName='min-w-44 font-mono bg-zinc-800/60 border-zinc-700/50 hover:border-primary/30 text-white'
            searcher
          >
            {currencies
              ?.filter((c) => c.type === 'crypto')
              .map((c) => (
                <ComboboxItem key={c.id} value={c} className='font-mono'>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-primary'>{c.symbol}</span>
                    <span className='text-zinc-400'>-</span>
                    <span>{c.name}</span>
                  </div>
                </ComboboxItem>
              ))}
          </Combobox>
          <Combobox
            id='quote'
            variant='secondary'
            loading={loadingCurrencies}
            onChange={setQuote}
            value={quote}
            label={quote?.symbol || quote?.name}
            defaultLabel={t('selectQuote')}
            triggerClassName='min-w-44 font-mono bg-zinc-800/60 border-zinc-700/50 hover:border-primary/30 text-white'
            searcher
          >
            {currencies
              ?.filter((c) => c.type === 'fiat')
              .map((c) => (
                <ComboboxItem key={c.id} value={c} className='font-mono'>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-emerald-400'>{c.symbol}</span>
                    <span className='text-zinc-400'>-</span>
                    <span>{c.name}</span>
                  </div>
                </ComboboxItem>
              ))}
          </Combobox>
          <Combobox
            id='methods'
            variant='secondary'
            loading={loadingMethods}
            onChange={setPaymentMethod}
            value={paymentMethod}
            label={paymentMethod?.name ?? t('allPayments')}
            triggerClassName='min-w-44 font-mono bg-zinc-800/60 border-zinc-700/50 hover:border-primary/30 text-white'
            searcher
          >
            <ComboboxItem value={undefined} className='font-mono text-zinc-400'>
              <div className='flex items-center gap-2'>
                <span className='text-xs'>{'>'}</span>
                {t('allPayments')}
              </div>
            </ComboboxItem>
            {paymentMethods?.data
              ?.filter((p) => p.enable)
              .map((c) => (
                <ComboboxItem key={c.id} value={c} className='font-mono'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span>{c.name}</span>
                  </div>
                </ComboboxItem>
              ))}
          </Combobox>
        </span>
        <span className='flex gap-3 items-center flex-1 justify-end'>
          <Combobox
            id='orderBy'
            variant='secondary'
            onChange={setSortBy}
            value={sortBy}
            label={`${t('orderBy')}${t(sortBy)}`}
            defaultLabel={p2pT('orderBy')}
            triggerClassName='min-w-44 max-w-64 font-mono bg-zinc-800/60 border-zinc-700/50 hover:border-primary/30 text-white'
          >
            <ComboboxItem value='price' className='font-mono'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-primary'>↕</span>
                {p2pT('price')}
              </div>
            </ComboboxItem>
            <ComboboxItem value='minimum_order_size' className='font-mono'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-emerald-400'>↑</span>
                {t('minimum_order_size')}
              </div>
            </ComboboxItem>
            <ComboboxItem value='maximum_order_size' className='font-mono'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-red-400'>↓</span>
                {t('maximum_order_size')}
              </div>
            </ComboboxItem>
          </Combobox>
          <Popover>
            <PopoverTrigger asChild>
              <Button size='icon' className='p-2' variant='secondary'>
                <ReloadIcon className=' size-6 shrink-0' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col w-full p-0'>
              <Button
                className='rounded-none text-base font-bold justify-start'
                variant={refreshTime === undefined ? 'default' : 'ghost'}
                onClick={() => setRefreshTime(undefined)}
              >
                <PopoverClose>{t('disabledRefresh')}</PopoverClose>
              </Button>
              <Button
                className='rounded-none text-base font-bold justify-start'
                variant={refreshTime === 5 ? 'default' : 'ghost'}
                onClick={() => setRefreshTime(5)}
              >
                <PopoverClose>{t('refresh', { seconds: 5 })}</PopoverClose>
              </Button>
              <Button
                className='rounded-none text-base font-bold justify-start'
                variant={refreshTime === 10 ? 'default' : 'ghost'}
                onClick={() => setRefreshTime(10)}
              >
                <PopoverClose>{t('refresh', { seconds: 10 })}</PopoverClose>
              </Button>
              <Button
                className='rounded-none text-base font-bold justify-start'
                variant={refreshTime === 20 ? 'default' : 'ghost'}
                onClick={() => setRefreshTime(20)}
              >
                <PopoverClose>{t('refresh', { seconds: 20 })}</PopoverClose>
              </Button>
            </PopoverContent>
          </Popover>
        </span>
      </section>
      {/* Mock P2P data for portfolio demo */}
      {!isLoading && (
        <div className='bg-zinc-900/30 rounded-xl border border-zinc-700/30 overflow-hidden'>
          <Table className='w-full'>
            <TableHeader>
              <TableRow className='border-b border-zinc-700/50 bg-zinc-800/50'>
                <TableHead className='text-zinc-200 font-bold py-3 px-4 text-sm'>
                  {p2pT('advertisers')}
                </TableHead>
                <TableHead className='text-zinc-200 font-bold py-3 px-4 text-sm'>
                  {p2pT('price')}
                </TableHead>
                <TableHead className='text-zinc-200 font-bold py-3 px-4 text-sm'>
                  {p2pT('availableOrderLimit')}
                </TableHead>
                <TableHead className='text-zinc-200 font-bold py-3 px-4 text-sm'>
                  {p2pT('payment')}
                </TableHead>
                <TableHead className='text-end text-zinc-200 font-bold py-3 px-4 text-sm'>
                  {p2pT('trade')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Mock data rows */}
              {[
                {
                  id: '1',
                  user_alias: 'CryptoTrader_MX',
                  price: '43,285.50',
                  available: '2.45780000',
                  minOrder: '500',
                  maxOrder: '25,000',
                  payment: 'spei_transfer',
                  time: 900,
                },
                {
                  id: '2',
                  user_alias: 'BitcoinMaster',
                  price: '43,195.75',
                  available: '1.89234500',
                  minOrder: '1,000',
                  maxOrder: '50,000',
                  payment: 'oxxo_pay',
                  time: 1800,
                },
                {
                  id: '3',
                  user_alias: 'P2P_Expert',
                  price: '43,420.25',
                  available: '3.12450000',
                  minOrder: '250',
                  maxOrder: '15,000',
                  payment: 'banorte_transfer',
                  time: 1200,
                },
                {
                  id: '4',
                  user_alias: 'CryptoExchange',
                  price: '43,150.00',
                  available: '5.67890000',
                  minOrder: '2,000',
                  maxOrder: '100,000',
                  payment: 'bbva_transfer',
                  time: 2700,
                },
                {
                  id: '5',
                  user_alias: 'SatoshiDealer',
                  price: '43,380.90',
                  available: '0.89234000',
                  minOrder: '100',
                  maxOrder: '8,000',
                  payment: 'mercado_pago',
                  time: 600,
                },
              ].map((mockItem, index) => (
                <TableRow
                  key={mockItem.id}
                  className='group border-b border-zinc-800/30 hover:border-primary/20 transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-primary/5 hover:via-transparent hover:to-primary/5'
                >
                  {/* Advertiser Cell - Enhanced */}
                  <td className='relative px-4 py-3 align-middle'>
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='relative size-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full border-2 border-zinc-600 group-hover:border-primary/40 transition-colors duration-300 flex items-center justify-center'>
                          <span className='text-lg font-bold text-white'>
                            {mockItem.user_alias.charAt(0)}
                          </span>
                        </div>
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse'></div>
                      </div>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-bold text-lg text-white group-hover:text-primary transition-colors duration-300'>
                            {mockItem.user_alias}
                          </p>
                          <div className='w-5 h-5 bg-gradient-to-r from-primary to-emerald-400 rounded-full flex items-center justify-center'>
                            <svg
                              className='w-3 h-3 text-black'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='flex items-center gap-3 text-sm'>
                          <div className='flex items-center gap-1 text-zinc-400'>
                            <div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
                            <span className='font-mono'>
                              {Math.floor(mockItem.time / 60)} min
                            </span>
                          </div>
                          <div className='text-zinc-500'>•</div>
                          <div className='text-zinc-400 font-mono text-xs'>
                            {95 + index}% completion
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price Cell - Enhanced */}
                  <td className='relative px-4 py-3 align-middle'>
                    <div className='space-y-2'>
                      <div className='flex items-baseline gap-2'>
                        <span className='text-2xl font-black text-white group-hover:text-primary transition-colors duration-300 font-mono'>
                          ${mockItem.price}
                        </span>
                        <span className='text-sm font-semibold text-zinc-400 uppercase tracking-wider'>
                          MXN
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-mono ${
                            index % 2 === 0
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {index % 2 === 0 ? '+0.5%' : '-0.3%'}
                        </div>
                        <span className='text-xs text-zinc-500 font-mono'>
                          {p2pT('vsMarket')}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Available Cell - Enhanced */}
                  <td className='relative px-4 py-3 align-top'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 font-mono'>
                          {mockItem.available}
                        </span>
                        <span className='text-sm font-semibold text-orange-400 uppercase tracking-wider'>
                          BTC
                        </span>
                      </div>
                      <div className='bg-zinc-800/60 rounded-lg p-3 border border-zinc-700/50 group-hover:border-zinc-600/50 transition-colors duration-300'>
                        <div className='space-y-1'>
                          <div className='flex justify-between text-xs text-zinc-400'>
                            <span>{p2pT('minOrder')}</span>
                            <span className='font-mono text-zinc-300'>
                              ${mockItem.minOrder}
                            </span>
                          </div>
                          <div className='flex justify-between text-xs text-zinc-400'>
                            <span>{p2pT('maxOrder')}</span>
                            <span className='font-mono text-zinc-300'>
                              ${mockItem.maxOrder}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Payment Cell - Enhanced */}
                  <td className='relative px-4 py-3 align-middle'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            mockItem.payment === 'spei_transfer'
                              ? 'bg-blue-500'
                              : mockItem.payment === 'oxxo_pay'
                                ? 'bg-red-500'
                                : mockItem.payment === 'banorte_transfer'
                                  ? 'bg-purple-500'
                                  : mockItem.payment === 'bbva_transfer'
                                    ? 'bg-blue-600'
                                    : 'bg-green-500'
                          } shadow-lg`}
                        ></div>
                        <span className='font-semibold text-white group-hover:text-primary transition-colors duration-300'>
                          {mockItem.payment === 'spei_transfer'
                            ? 'SPEI Transfer'
                            : mockItem.payment === 'oxxo_pay'
                              ? 'Oxxo Pay'
                              : mockItem.payment === 'banorte_transfer'
                                ? 'Banorte'
                                : mockItem.payment === 'bbva_transfer'
                                  ? 'BBVA'
                                  : 'Mercado Pago'}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <span className='text-xs text-zinc-400 font-mono'>
                          {p2pT('instant')}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Trade Cell - Enhanced */}
                  <td className='relative px-4 py-3 align-middle'>
                    <div className='flex justify-end'>
                      <Button
                        className={`font-mono text-sm transition-all duration-300 group-hover:scale-105 ${
                          orderType === 'sell'
                            ? 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40'
                            : 'bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled
                      >
                        <span className='flex items-center gap-2'>
                          <span className='text-xs'>{'>'}</span>
                          <span>
                            {orderType === 'sell' ? t('buyAction') : t('sellAction')}
                          </span>
                          <span className='text-xs font-bold'>BTC</span>
                        </span>
                      </Button>
                    </div>
                  </td>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <tr>
                <td
                  colSpan={5}
                  className='px-4 py-4 bg-zinc-800/30 border-t border-zinc-700/50'
                >
                  <div className='flex items-center justify-between'>
                    {/* Terminal-style pagination info */}
                    <div className='font-mono text-sm text-zinc-400'>
                      <span className='text-primary'>{'>'}</span> showing 1-5 of 127
                      traders
                    </div>

                    {/* Simple pagination controls */}
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='font-mono text-xs bg-zinc-800/60 border-zinc-700/50 hover:bg-zinc-700/60 hover:border-primary/30 hover:text-primary transition-all duration-200 opacity-50 cursor-not-allowed'
                        disabled
                      >
                        <span className='text-xs'>←</span> prev
                      </Button>

                      <div className='flex items-center gap-1'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='font-mono text-xs bg-primary text-black border-primary hover:bg-primary/80'
                        >
                          1
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='font-mono text-xs bg-zinc-800/60 border-zinc-700/50 hover:bg-zinc-700/60 hover:border-primary/30 hover:text-primary transition-all duration-200'
                        >
                          2
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='font-mono text-xs bg-zinc-800/60 border-zinc-700/50 hover:bg-zinc-700/60 hover:border-primary/30 hover:text-primary transition-all duration-200'
                        >
                          3
                        </Button>
                        <span className='text-zinc-500 mx-1 font-mono'>...</span>
                        <Button
                          variant='outline'
                          size='sm'
                          className='font-mono text-xs bg-zinc-800/60 border-zinc-700/50 hover:bg-zinc-700/60 hover:border-primary/30 hover:text-primary transition-all duration-200'
                        >
                          26
                        </Button>
                      </div>

                      <Button
                        variant='outline'
                        size='sm'
                        className='font-mono text-xs bg-zinc-800/60 border-zinc-700/50 hover:bg-zinc-700/60 hover:border-primary/30 hover:text-primary transition-all duration-200'
                      >
                        next <span className='text-xs'>→</span>
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </TableFooter>
          </Table>
        </div>
      )}

      {isLoading && (
        <div className='h-20 flex justify-center items-center text-xl font-medium'>
          {t('loading')}
        </div>
      )}
    </div>
  );
};
