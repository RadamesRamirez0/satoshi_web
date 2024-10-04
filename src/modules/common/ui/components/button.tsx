import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';

import { cn } from '@/modules/common/ui/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-8 rounded-md px-3 text-xs',
        sm: 'h-10 rounded-md px-3 text-sm',
        md: 'h-12 rounded-lg px-8 text-base font-medium',
        lg: 'h-12 rounded-lg px-8 text-lg font-semibold',
        xl: 'h-16 rounded-x px-3 text-xl font-semibold',
        icon: 'size-8',
      },
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-background text-secondary-foreground shadow hover:bg-background/80',
        ghost: 'hover:bg-white/10 hover:text-primary text-whiteBG',
        darkGhost: 'hover:bg-accent hover:text-primary text-background',
        string: ' hover:text-primary text-whiteBG px-0 py-0 h-auto flex items-center',
        darkString:
          ' hover:text-primary text-background px-0 py-0 h-auto flex items-center',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <CgSpinner className='animate-spin  text-zinc-900 size-5' />
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
