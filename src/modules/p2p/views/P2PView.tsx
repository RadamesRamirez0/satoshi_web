import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { DataTableP2P } from '@/modules/common/ui/components/data-table';

export interface Order {
  advertiser: string;
  price: string;
  available: string;
  payment: string;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'advertiser',
    header: 'Advertisers',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'available',
    header: 'Available',
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
  },
];

const P2PView = () => {
  return (
    <div>
      <DataTableP2P
        columns={columns}
        data={[
          {
            advertiser: 'Advertiser 1',
            price: '0.00000001',
            available: '1000',
            payment: 'Visa',
          },
          {
            advertiser: 'Advertiser 2',
            price: '0.00000002',
            available: '2000',
            payment: 'MasterCard',
          },
        ]}
      ></DataTableP2P>
    </div>
  );
};

export default P2PView;
