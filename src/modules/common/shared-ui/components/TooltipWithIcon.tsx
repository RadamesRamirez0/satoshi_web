import { InfoCircledIcon } from '@radix-ui/react-icons';
import { TooltipTriggerProps } from '@radix-ui/react-tooltip';
import React, { FC } from 'react';

import { TooltipTrigger } from '@/modules/common/ui/components/tooltip';
import { cn } from '@/modules/common/ui/lib/utils';

export type TooltipWithIconProps = TooltipTriggerProps;

export const TooltipWithIcon: FC<TooltipWithIconProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <TooltipTrigger {...props} asChild>
      <span className={cn('flex items-center gap-2', className)}>
        <p>{children}</p>
        <InfoCircledIcon className='text-whiteBG' />
      </span>
    </TooltipTrigger>
  );
};
