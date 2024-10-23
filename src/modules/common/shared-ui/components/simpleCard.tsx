import React, { PropsWithChildren } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

export interface SimpleCardProps extends PropsWithChildren {
  className?: string;
}

const SimpleCard = ({ children, className }: SimpleCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start border rounded-lg px-0 py-0  p-4 w-full h-min gap-2',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
