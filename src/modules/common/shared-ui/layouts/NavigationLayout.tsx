import React, { FC, PropsWithChildren } from 'react';

import { MainNavigationMenu } from '@/modules/common/shared-ui/components/MainNavigationMenu';
import { cn } from '@/modules/common/ui/lib/utils';

export interface NavigationLayoutProps extends PropsWithChildren {
  noPadding?: boolean;
}

const NavigationLayout: FC<NavigationLayoutProps> = ({ children, noPadding = false }) => {
  return (
    <>
      <MainNavigationMenu />
      <main
        className={cn(
          ' flex flex-col flex-1 ',
          !noPadding && ' p-4 md:px-12 lg:px-18  xl:px-24 2xl:px-32',
        )}
      >
        {children}
      </main>
    </>
  );
};

export default NavigationLayout;
