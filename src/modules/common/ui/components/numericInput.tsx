import React, { FC, PropsWithChildren } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { inputVariants } from '@/modules/common/ui/components/input';
import { cn } from '@/modules/common/ui/lib/utils';

export interface NumericInputProps extends NumericFormatProps, PropsWithChildren {
  decimals?: number;
  error?: boolean;
}

export const NumericInput: FC<NumericInputProps> = ({
  decimals,
  error,
  className,
  ...props
}) => {
  return (
    <NumericFormat
      {...props}
      allowNegative={false}
      decimalScale={decimals}
      thousandSeparator
      className={cn(inputVariants({ error }), className)}
    />
  );
};
