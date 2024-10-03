import React, { FC, PropsWithChildren } from 'react';

import { MainNavigationMenu } from '@/modules/common/shared-ui/components/MainNavigationMenu';

export interface NavigationLayoutProps extends PropsWithChildren {
  params: { locale: string };
}

const NavigationLayout: FC<NavigationLayoutProps> = ({ children }) => {
  return (
    <>
      <MainNavigationMenu />
      <main className='p-4 flex flex-col flex-1 md:px-12 lg:px-18  xl:px-24 2xl:px-32'>
        {children}
      </main>
    </>
  );
};

export default NavigationLayout;
