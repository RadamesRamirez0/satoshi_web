import React, { FC, PropsWithChildren } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';

export interface NavigationItemProps extends PropsWithChildren {
  className?: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ children, className }) => {
  return (
    <li>
      <Button
        variant='string'
        size='lg'
        className={cn('h-16  rounded-none px-2 font-bold', className)}
        asChild
      >
        {children}
      </Button>
    </li>
  );
};

export default NavigationItem;
