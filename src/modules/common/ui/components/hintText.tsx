import { cva, VariantProps } from 'class-variance-authority';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

const hintTextVariants = cva('text-sm pt-1', {
  variants: {
    variant: {
      error: 'text-red-500',
      hint: 'text-whiteBG',
    },
  },
  defaultVariants: {
    variant: 'hint',
  },
});

interface HintProps
  extends PropsWithChildren,
    VariantProps<typeof hintTextVariants>,
    HTMLAttributes<HTMLParagraphElement> {}

const HintText: FC<HintProps> = ({ variant, className, ...props }) => {
  return <p className={cn(hintTextVariants({ variant, className }))} {...props} />;
};

export default HintText;
