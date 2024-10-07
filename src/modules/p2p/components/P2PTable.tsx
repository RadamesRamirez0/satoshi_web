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
import { announcements } from '@/modules/p2p/views/P2PView';

export interface P2PTableProps {
  announcements: typeof announcements;
}

export const P2PTable: FC<P2PTableProps> = ({ announcements }) => {
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
        {announcements.map(
          ({
            available,
            commendRate,
            completion,
            id,
            maxOrder,
            minOrder,
            orders,
            payments,
            price,
            transactionTime,
            username,
          }) => (
            <TableRow key={id}>
              <AdvertiserCell
                {...{ username, completion, orders, commendRate, transactionTime }}
              />
              <PriceCell {...{ price }} />
              <AvailableCell {...{ available, minOrder, maxOrder }} />
              <PaymentCell {...{ payments }} />
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
