import React, { FC, PropsWithChildren } from 'react';

import { MainNavigationMenu } from '@/modules/common/shared-ui/components/MainNavigationMenu';

export interface NavigationLayoutProps extends PropsWithChildren {
  params: { locale: string };
}

const NavigationLayout: FC<NavigationLayoutProps> = ({ children }) => {
  return (
    <main className='p-4 flex flex-col flex-1'>
      <MainNavigationMenu />
      {children}
    </main>
  );
};

export default NavigationLayout;
