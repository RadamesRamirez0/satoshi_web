import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { AutoNumericInput } from 'react-autonumeric';

import { cn } from '@/modules/common/ui/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  numeric?: boolean;
  state?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  decimals?: number;
}

const inputVariants = cva(
  [
    'flex  w-full rounded-md caret-primary font-medium  border border-input autofill:bg-transparent',
    ' border-zinc-700  bg-transparent px-3 py-2.5 text-base shadow-sm transition-all focus-visible:border-ring',
    ' file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground',
    ' focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
      state,
      setState,
      ...props
    },
    ref,
  ) => {
    if (numeric) {
      return (
        <AutoNumericInput
          inputProps={{
            type,
            className: cn(inputVariants({ error }), className),
            ...props,
          }}
          valueState={{ state: state ?? '', stateSetter: setState ?? (() => {}) }}
          autoNumericOptions={{
            decimalPlaces: decimals,
            roundingMethod: 'D',
            allowDecimalPadding: 'floats',
          }}
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
