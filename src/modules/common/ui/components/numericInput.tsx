import React, { FC, PropsWithChildren } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { inputVariants } from '@/modules/common/ui/components/input';
import { cn } from '@/modules/common/ui/lib/utils';

export interface NumericInputProps extends NumericFormatProps, PropsWithChildren {
  decimals?: number;
  error?: boolean;
  trailingText?: string;
}

export const NumericInput: FC<NumericInputProps> = ({
  decimals,
  error,
  className,
  trailingText,
  ...props
}) => {
  return (
    <div className='relative md:w-min'>
      <NumericFormat
        {...props}
        allowNegative={false}
        decimalScale={decimals}
        thousandSeparator
        className={cn(inputVariants({ error }), trailingText && 'pr-16', className)}
      />
      {trailingText && (
        <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-whiteBG/80'>
          {trailingText}
        </span>
      )}
    </div>
  );
};
