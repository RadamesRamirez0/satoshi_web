import React, { FC } from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@/modules/common/ui/lib/utils';

export interface CurrencyLabelProps {
  decimals?: number;
  value: string;
  className?: string;
}
const CurrencyLabel: FC<CurrencyLabelProps> = ({ value, className, decimals = 2 }) => {
  return (
    <NumericFormat
      allowNegative={false}
      decimalScale={decimals}
      thousandSeparator
      className={cn('bg-transparent text-2xl font-bold', className)}
      readOnly
      value={value}
      valueIsNumericString
    />
  );
};

export default CurrencyLabel;
