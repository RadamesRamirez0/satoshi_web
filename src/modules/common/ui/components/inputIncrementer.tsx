import React, { FC } from 'react';
import { NumericFormat, SourceInfo } from 'react-number-format';

import { Button } from '@/modules/common/ui/components/button';
import { inputVariants } from '@/modules/common/ui/components/input';
import { NumericInputProps } from '@/modules/common/ui/components/numericInput';
import { cn } from '@/modules/common/ui/lib/utils';

export const InputIncrementer: FC<NumericInputProps & { percent?: boolean }> = ({
  className,
  error,
  decimals = 2,
  percent = false,
  ...props
}) => {
  return (
    <span className='relative w-min'>
      <NumericFormat
        type='text'
        allowNegative={false}
        decimalScale={decimals}
        thousandSeparator
        className={cn(
          inputVariants({ error }),
          className,
          'hover:border-x-transparent',
          'pl-[3.75rem] pr-[3.75rem] peer text-center',
        )}
        valueIsNumericString
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        className={cn(
          'absolute left-0 bottom-0 h-full w-12 flex items-center justify-center bg-muted rounded-r-none rounded-l-md border border-zinc-700',
          'peer-focus-visible:border-ring text-2xl',
          'peer-hover:border-r-ring',
          'hover:border-ring',
          error && 'focus-visible:ring-red-500',
        )}
        onClick={() => {
          const value = parseFloat(props.value as string);
          if (isNaN(value)) {
            return;
          }
          let decrement = '1';

          if (!percent) {
            decrement = `0.${'0'.repeat(decimals - 1)}1`;
          }

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
      </Button>
      <Button
        type='button'
        variant='ghost'
        className={cn(
          'absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-muted rounded-l-none rounded-r-md border border-zinc-700',
          'peer-focus-visible:border-ring text-2xl',
          'peer-hover:border-l-ring',
          'hover:border-ring',
          error && 'focus-visible:ring-red-500',
        )}
        onClick={() => {
          const value = parseFloat(props.value as string);
          if (isNaN(value)) {
            return;
          }
          let increment = '1';

          if (!percent) {
            increment = `0.${'0'.repeat(decimals - 1)}1`;
          }

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
      </Button>
    </span>
  );
};
