import React from 'react';
import { NumericFormat, SourceInfo } from 'react-number-format';

import { inputVariants } from '@/modules/common/ui/components/input';
import { NumericInputProps } from '@/modules/common/ui/components/numericInput';
import { cn } from '@/modules/common/ui/lib/utils';

export const InputIncrementer = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, error, decimals = 2, ...props }) => {
    return (
      <span className='relative w-min'>
        <NumericFormat
          allowNegative={false}
          decimalScale={decimals}
          thousandSeparator
          className={cn(
            inputVariants({ error }),
            className,
            'pl-[3.75rem] pr-[3.75rem] peer',
          )}
          valueIsNumericString
          {...props}
        />
        <button
          type='button'
          className={cn(
            'absolute left-0 bottom-0 h-full w-12 flex items-center justify-center bg-muted rounded-l-md border border-zinc-700',
            'peer-focus-visible:border-ring text-2xl',
            error && 'focus-visible:ring-red-500',
          )}
          onClick={() => {
            const value = parseFloat(props.value as string);
            if (isNaN(value)) {
              return;
            }
            const decrement = `0.${'0'.repeat(decimals - 1)}1`;

            props.onValueChange?.(
              {
                value: (value - parseFloat(decrement)).toString(),
                floatValue: value - parseFloat(decrement),
                formattedValue: (value - parseFloat(decrement)).toString(),
              },
              {} as SourceInfo,
            );
          }}
        >
          -
        </button>
        <button
          type='button'
          className={cn(
            'absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-muted rounded-r-md border border-zinc-700',
            'peer-focus-visible:border-ring text-2xl',
            error && 'focus-visible:ring-red-500',
          )}
          onClick={() => {
            const value = parseFloat(props.value as string);
            if (isNaN(value)) {
              return;
            }
            const increment = `0.${'0'.repeat(decimals - 1)}1`;

            props.onValueChange?.(
              {
                value: (value + parseFloat(increment)).toString(),
                floatValue: value + parseFloat(increment),
                formattedValue: (value + parseFloat(increment)).toString(),
              },
              {} as SourceInfo,
            );
          }}
        >
          +
        </button>
      </span>
    );
  },
);
InputIncrementer.displayName = 'InputIncrementer';
