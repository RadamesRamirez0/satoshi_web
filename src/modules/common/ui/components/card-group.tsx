'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

export const CardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(' gap-4 w-full', className)}
      {...props}
      ref={ref}
    />
  );
});
CardGroup.displayName = 'CardGroup';

export const CardGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'rounded-2xl text-card-foreground shadow border py-6 px-4 data-[state=checked]:p-6 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 transition-all group',
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});
CardGroupItem.displayName = 'CardGroupItem';
