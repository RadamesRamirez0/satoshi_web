import React, { FC, PropsWithChildren } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

export interface BackgroundPopoverProps extends PropsWithChildren {
  open: boolean;
  className?: string;
}

const BackgroundPopover: FC<BackgroundPopoverProps> = ({ open, children, className }) => {
  return (
    <div
      className={cn([
        'absolute z-50 w-72 mt-2 rounded-xl overflow-hidden border bg-background p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
        !open && 'hidden',
      ])}
    >
      {children}
    </div>
  );
};

export default BackgroundPopover;
