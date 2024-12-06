'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
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
import { criptoRepository } from '@/modules/cripto/repository';
import { OrderType } from '@/modules/express/models/orderType';
import {
  AdvertiserCell,
  AvailableCell,
  PaymentCell,
  PriceCell,
  TradeCell,
} from '@/modules/p2p/components/P2PTableCells';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { p2pRepository } from '@/modules/p2p/repository';

export const P2PTable: FC = () => {
  const [orderType, setOrderType] = useState<OrderType>('buy');
  const [base, setBase] = useState<Currency>();
  const [quote, setQuote] = useState<Currency>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [refreshTime, setRefreshTime] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<
    'price' | 'minimum_order_size' | 'maximum_order_size'
  >('price');

  const t = useTranslations('P2PView');

  const { data, isLoading } = useQuery({
    queryKey: ['announcements', orderType, base, paymentMethod, quote, sortBy],
    queryFn: () =>
      p2pRepository.getAnnouncements({
        queryParams: {
          type: orderType === 'sell' ? 'buy' : 'sell',
          base: base?.id,
          quote: quote?.id,
          payment_method: paymentMethod?.id,
          sort_by: sortBy,
        },
      }),
    refetchInterval: refreshTime ? refreshTime * 1000 : undefined,
  });

  const { data: currencies, isLoading: loadingCurrencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: () => criptoRepository.getCurrencies({}),
  });

  const { data: paymentMethods, isLoading: loadingMethods } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: () => p2pRepository.paymentMethods({}),
  });

  useEffect(() => {
    if (!currencies || currencies.length === 0) {
      return;
    }

    setBase(currencies.filter((c) => c.type === 'crypto')[0]);
    setQuote(currencies.filter((c) => c.type === 'fiat')[0]);
  }, [currencies]);

  return (
    <div className='bg-muted p-4 rounded-xl mt-6 overflow-x-auto'>
      <section className='flex gap-3 items-center'>
        <span className='flex gap-3 items-center'>
          <Tabs value={orderType} onValueChange={(v) => setOrderType(v as OrderType)}>
            <TabsList className='h-auto p-1 bg-background'>
              <TabsTrigger
                value='buy'
                className='data-[state=active]:bg-primary data-[state=active]:text-background text-lg font-medium'
              >
                {t('buy')}
              </TabsTrigger>
              <TabsTrigger
                value='sell'
                className='data-[state=active]:bg-primary data-[state=active]:text-background text-lg font-medium'
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
            label={base?.name}
            triggerClassName='min-w-44'
            searcher
          >
            {currencies
              ?.filter((c) => c.type === 'crypto')
              .map((c) => (
                <ComboboxItem key={c.id} value={c}>
                  {c.name}
                </ComboboxItem>
              ))}
          </Combobox>
          <Combobox
            id='quote'
            variant='secondary'
            loading={loadingCurrencies}
            onChange={setQuote}
            value={quote}
            label={quote?.name}
            defaultLabel={t('selectQuote')}
            triggerClassName='min-w-44'
            searcher
          >
            {currencies
              ?.filter((c) => c.type === 'fiat')
              .map((c) => (
                <ComboboxItem key={c.id} value={c}>
                  {c.name}
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
            triggerClassName='min-w-44'
            searcher
          >
            <ComboboxItem value={undefined}>{t('allPayments')}</ComboboxItem>
            {paymentMethods?.data
              ?.filter((p) => p.enable)
              .map((c) => (
                <ComboboxItem key={c.id} value={c}>
                  {c.name}
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
            defaultLabel='Ordenar por'
            triggerClassName='min-w-44 max-w-64'
          >
            <ComboboxItem value='price'>Precio</ComboboxItem>
            <ComboboxItem value='minimum_order_size'>Minimo de compra</ComboboxItem>
            <ComboboxItem value='maximum_order_size'>Maximo de compra</ComboboxItem>
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
      {data?.data && (
        <Table className='w-full overflow-clip'>
          <TableHeader>
            <TableRow>
              <TableHead>Advertisers</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available/Order Limit</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className='text-end pr-8'>Trade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map(
              ({
                amount,

                id,
                maximum_time_for_transaction_completion,
                maximum_order_size,
                minimum_order_size,
                user_alias,
                price,
                payment_method,
                type,
                quote,
                base,
              }) => (
                <TableRow key={id}>
                  <AdvertiserCell
                    username={user_alias}
                    transactionTime={maximum_time_for_transaction_completion}
                  />
                  <PriceCell price={price} quote={quote} />
                  <AvailableCell
                    available={amount}
                    maxOrder={maximum_order_size}
                    minOrder={minimum_order_size}
                    quote={quote}
                    base={base}
                  />
                  <PaymentCell payments={[payment_method]} />
                  <TradeCell announcementId={id} announcementType={type as OrderType} />
                </TableRow>
              ),
            )}
          </TableBody>
          <TableFooter>
            <tr>
              <td colSpan={5} className='pt-8'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href='#' />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href='#'>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href='#' />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </td>
            </tr>
          </TableFooter>
        </Table>
      )}
      {!data?.data && !isLoading && (
        <div className='h-20 flex justify-center items-center text-xl font-medium'>
          {t('noAnnouncements')}
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
