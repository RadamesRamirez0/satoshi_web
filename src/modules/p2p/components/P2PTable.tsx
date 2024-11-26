'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

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
import { Tabs, TabsList, TabsTrigger } from '@/modules/common/ui/components/tabs';
import { OrderType } from '@/modules/express/models/orderType';
import {
  AdvertiserCell,
  AvailableCell,
  PaymentCell,
  PriceCell,
  TradeCell,
} from '@/modules/p2p/components/P2PTableCells';
import { p2pRepository } from '@/modules/p2p/repository';

export const P2PTable: FC = () => {
  const [orderType, setOrderType] = useState<OrderType>('buy');
  const t = useTranslations('P2PView');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['announcements', orderType],
    queryFn: () => p2pRepository.getAnnouncements({ queryParams: { type: orderType } }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading announcements</div>; // Puedes mejorar el manejo de errores aquí
  }

  if (!data?.data.length) {
    return <div>No announcements available</div>;
  }

  return (
    <div>
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as OrderType)}>
        <TabsList>
          <TabsTrigger value='buy'>{t('buy')}</TabsTrigger>
          <TabsTrigger value='sell'>{t('sell')}</TabsTrigger>
        </TabsList>
      </Tabs>
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
    </div>
  );
};
