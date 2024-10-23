'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

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
import {
  AdvertiserCell,
  AvailableCell,
  PaymentCell,
  PriceCell,
  TradeCell,
} from '@/modules/p2p/components/P2PTableCells';
import { p2pRepository } from '@/modules/p2p/repository';

export const P2PTable: FC = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => p2pRepository.getAnnouncements({}),
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
          }) => (
            <TableRow key={id}>
              <AdvertiserCell
                username={user_alias}
                transactionTime={maximum_time_for_transaction_completion}
              />
              <PriceCell price={price} />
              <AvailableCell
                available={amount}
                maxOrder={maximum_order_size}
                minOrder={minimum_order_size}
              />
              <PaymentCell payments={[payment_method]} />
              <TradeCell announcementId={id} />
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
  );
};
