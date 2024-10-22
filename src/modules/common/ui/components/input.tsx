import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@/modules/common/ui/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  numeric?: boolean;
  state?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  decimals?: number;
}

export const inputVariants = cva(
  [
    'flex  w-full rounded-md caret-primary font-medium  border border-input autofill:bg-transparent',
    ' border-zinc-700  bg-transparent px-3 py-2.5 text-base shadow-sm transition-all  focus-visible:border-ring',
    ' file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground',
    ' focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    'hover:border-ring focus:border-ring focus:ring-ring focus:ring-1',
  ],
  {
    variants: {
      error: {
        false: '',
        true: 'focus-visible:border-red-600 focus-visible:ring-red-600 border-red-600',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      autoComplete = 'off',
      numeric = false,
      decimals = 2,

      ...props
    },
    ref,
  ) => {
    if (numeric) {
      return (
        <NumericFormat
          allowNegative={false}
          decimalScale={decimals}
          thousandSeparator
          className={cn(inputVariants({ error }), className)}
        />
      );
    }

    return (
      <input
        type={type}
        autoComplete={autoComplete}
        className={cn(inputVariants({ error }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
