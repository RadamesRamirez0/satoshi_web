import { CheckIcon, ClockIcon } from '@radix-ui/react-icons';
import React from 'react';
import { FaThumbsUp } from 'react-icons/fa6';

import { Button } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';

export interface AdvertiserCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  username: string;
  orders: string;
  completion: string;
  commendRate: string;
  transactionTime: number;
}

export const AdvertiserCell = React.forwardRef<HTMLTableCellElement, AdvertiserCellProps>(
  (
    { className, username, orders, transactionTime, commendRate, completion, ...props },
    ref,
  ) => (
    <td
      ref={ref}
      className={cn(
        'p-2 py-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] space-y-2',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <div className='size-5 bg-white' />
        <p className='font-medium text-lg'>{username}</p>
        <CheckIcon className='w-4 h-4 text-primary' />
      </div>
      <div className='flex items-center gap-2 font-medium text-sm'>
        <p>{`${orders} orders`}</p>

        <p>{`${completion} completion`}</p>
      </div>
      <div className='flex items-center gap-2 text-sm font-medium'>
        <span className='flex items-center gap-2'>
          <FaThumbsUp className='size-3 ' />
          {commendRate}
        </span>
        <span className='flex items-center gap-2'>
          <ClockIcon className='size-3' />
          {transactionTime} min
        </span>
      </div>
    </td>
  ),
);
AdvertiserCell.displayName = 'AdvertiserCell';

export interface PriceCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  price: string;
}

export const PriceCell = React.forwardRef<HTMLTableCellElement, PriceCellProps>(
  ({ className, price, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-2 py-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] flex items-center gap-2',
        className,
      )}
      {...props}
    >
      <p className='font-bold text-lg'>{price}</p>
      <p className='font-bold'>MXN</p>
    </td>
  ),
);
PriceCell.displayName = 'PriceCell';

export interface AvailableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  available: string;
  minOrder: string;
  maxOrder: string;
}

export const AvailableCell = React.forwardRef<HTMLTableCellElement, AvailableCellProps>(
  ({ className, available, minOrder, maxOrder, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-2 pt-4 px-0  align-top [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-medium text-sm',
        className,
      )}
      {...props}
    >
      <p className='pb-2'>{available} TBTC</p>
      <span className='flex gap-1'>
        <p>{`$${minOrder} MXN -`}</p>
        <p>{` $${maxOrder} MXN`}</p>
      </span>
    </td>
  ),
);
AvailableCell.displayName = 'AvailableCell';

export interface PaymentCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  payments: string[];
}

export const PaymentCell = React.forwardRef<HTMLTableCellElement, PaymentCellProps>(
  ({ className, payments, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-2 py-4 align-top [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    >
      <div className=''>
        {payments.map((payment) => (
          <div key={payment} className='flex items-center gap-1 font-bold'>
            <div className='size-3 bg-white shrink-0' />
            <p>{payment}</p>
          </div>
        ))}
      </div>
    </td>
  ),
);
PaymentCell.displayName = 'PaymentCell';

export interface TradeCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  announcementId: string;
}

export const TradeCell = React.forwardRef<HTMLTableCellElement, TradeCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] flex items-center justify-end px-2',
        className,
      )}
      {...props}
    >
      <Button variant='green' className='font-bold'>
        Buy TBTC
      </Button>
    </td>
  ),
);
TradeCell.displayName = 'TradeCell';
