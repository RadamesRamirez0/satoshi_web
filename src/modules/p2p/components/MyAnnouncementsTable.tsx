'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Session } from '@/modules/auth/types/tokenPayload';
import { Badge } from '@/modules/common/ui/components/badge';
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
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/common/ui/components/table';
import parseTsToDate from '@/modules/common/utils/parseTsToDate';
import { capitalizeWords } from '@/modules/common/utils/strings';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import { OrderType } from '@/modules/express/models/orderType';
import {
  AvailableCell,
  PaymentCell,
  PriceCell,
  StatusCell,
} from '@/modules/p2p/components/P2PTableCells';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { p2pRepository } from '@/modules/p2p/repository';

export interface MyAnnouncementsTableProps {
  session: Session;
}

const MyAnnouncementsTable = ({ session }: MyAnnouncementsTableProps) => {
  const [orderType, setOrderType] = useState<OrderType>();
  const [base, setBase] = useState<Currency>();
  const [quote, setQuote] = useState<Currency>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const t = useTranslations('P2PView');

  const { data, isLoading } = useQuery({
    queryKey: ['myAnnouncements', orderType, paymentMethod, quote, base, session],
    queryFn: () =>
      p2pRepository.getAnnouncements({
        queryParams: {
          type: orderType,
          payment_method: paymentMethod?.id,
          quote: quote?.id,
          base: base?.id,
          user_id: session.user.id,
        },
      }),
  });
  const { data: currencies, isLoading: loadingCurrencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: () => criptoRepository.getCurrencies({}),
  });

  const { data: paymentMethods, isLoading: loadingMethods } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: () => p2pRepository.paymentMethods({}),
  });

  return (
    <section className='bg-muted p-4 rounded-xl mt-6 overflow-x-auto'>
      <section className='flex gap-3 items-center'>
        <Combobox
          id='type'
          variant='secondary'
          onChange={setOrderType}
          value={orderType}
          defaultLabel={t('selectOrderType')}
          label={orderType ? t(orderType) : t('selectOrderType')}
          triggerClassName='min-w-44'
        >
          <ComboboxItem value={undefined}>{t('all')}</ComboboxItem>
          <ComboboxItem value='buy'>{t('buy')}</ComboboxItem>
          <ComboboxItem value='sell'>{t('sell')}</ComboboxItem>
        </Combobox>
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
          <ComboboxItem value={undefined}>{t('allBase')}</ComboboxItem>
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
          <ComboboxItem value={undefined}>{t('allQuote')}</ComboboxItem>
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
      </section>
      {data?.data && (
        <Table className='w-full overflow-clip'>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available/Order Limit</TableHead>
              <TableHead>Creation time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map(
              ({
                amount,
                id,
                maximum_order_size,
                minimum_order_size,
                price,
                payment_method,
                type,
                creation_time,
                quote,
                base,
                status,
              }) => (
                <TableRow key={id}>
                  <td>
                    <Badge
                      variant={type === 'buy' ? 'default' : 'secondary'}
                      className='text-sm'
                    >
                      {capitalizeWords(type)}
                    </Badge>
                  </td>
                  <PriceCell price={price} quote={quote} />
                  <AvailableCell
                    available={amount}
                    maxOrder={maximum_order_size}
                    minOrder={minimum_order_size}
                    quote={quote}
                    base={base}
                  />
                  <PaymentCell payments={[payment_method]} />
                  <td>{parseTsToDate(creation_time).toLocaleString()}</td>
                  <StatusCell>{status}</StatusCell>
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
    </section>
  );
};

export default MyAnnouncementsTable;
