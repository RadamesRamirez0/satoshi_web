import React, { FC, PropsWithChildren } from 'react';

import { Button } from '@/modules/common/ui/components/button';

const NavigationItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <li>
      <Button variant='string' size='lg' className='h-16  rounded-none px-2' asChild>
        {children}
      </Button>
    </li>
  );
};

export default NavigationItem;
