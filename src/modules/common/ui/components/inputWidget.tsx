'use client';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { AutoNumericInput } from 'react-autonumeric';

import { cn } from '@/modules/common/ui/lib/utils';

import { Label } from './label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  decimals?: number;
  error?: boolean;
}

export const InputWidget = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      children,
      state,
      setState,
      decimals = 2,
      error = false,
      ...props
    },
    _ref,
  ) => {
    return (
      <div className='relative'>
        {label && (
          <Label htmlFor={props.id} className={cn('absolute top-5 left-5 text-zinc-300')}>
            {label}
          </Label>
        )}
        <AutoNumericInput
          inputProps={{
            type,
            className: cn(
              'flex  w-full rounded-xl  bg-zinc-800 appearance-none number px-5 pb-4 pt-10 text-2xl shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              error &&
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 text-red-500 ',
              className,
            ),
            ...props,
          }}
          valueState={{ state, stateSetter: setState }}
          autoNumericOptions={{
            decimalPlaces: decimals,
            roundingMethod: 'D',
            allowDecimalPadding: 'floats',
          }}
        />
        {children}
      </div>
    );
  },
);
InputWidget.displayName = 'InputWidget';
