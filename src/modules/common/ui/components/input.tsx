import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { NumericFormat } from 'react-number-format';

import { cn } from '@/modules/common/ui/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  numeric?: boolean;
  state?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  decimals?: number;
  loading?: boolean;
}

export const inputVariants = cva(
  [
    'flex w-full rounded-md caret-primary font-medium border border-input autofill:bg-transparent',
    'border-zinc-700 bg-transparent px-3 py-2.5 text-base shadow-sm transition-all focus-visible:border-ring',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    'hover:border-ring focus:border-ring focus:ring-ring focus:ring-1 focus-visible:none',
  ],
  {
    variants: {
      error: {
        false: '',
        true: 'hover:border-red-600 hover:ring-1 hover:ring-red-600 focus-visible:border-red-600 focus-visible:ring-red-600 border-red-600',
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
      loading = false,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    if (numeric) {
      return (
        <NumericFormat
          onChange={props.onChange}
          allowNegative={false}
          decimalScale={decimals}
          thousandSeparator
          className={cn(inputVariants({ error }), className)}
        />
      );
    }

    if (type === 'password') {
      return (
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete={autoComplete}
            className={cn(inputVariants({ error }), className)}
            ref={ref}
            {...props}
          />
          {showPassword && (
            <EyeClosedIcon
              className='absolute right-0 bottom-0 top-0 m-auto mr-3'
              onClick={() => {
                setShowPassword(false);
              }}
            />
          )}

          {!showPassword && (
            <EyeOpenIcon
              className='absolute right-0 bottom-0 top-0 m-auto mr-3'
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <div className='relative'>
          <input
            type={type}
            autoComplete={autoComplete}
            className={cn(inputVariants({ error }), className)}
            ref={ref}
            {...props}
          />

          <CgSpinner className='animate-spin  text-zinc-100 size-5 absolute inset-y-0 inset-x-0 m-auto z-10' />
        </div>
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
