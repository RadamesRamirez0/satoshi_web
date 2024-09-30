import * as React from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

import { Label } from './label';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export const InputWidget = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, children, ...props }, ref) => {
    return (
      <div className='relative'>
        {label && (
          <Label htmlFor={props.id} className={cn('absolute top-5 left-5')}>
            {label}
          </Label>
        )}
        <input
          type={type}
          className={cn(
            'flex  w-full rounded-xl  bg-zinc-800 appearance-none number px-5 pb-6 pt-12 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {children}
      </div>
    );
  },
);
InputWidget.displayName = 'InputWidget';
