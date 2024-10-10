import { PropsWithChildren } from 'react';

import NavigationLayout from '@/app/[locale]/express/layout';

export default function DepositLayout({ children }: PropsWithChildren) {
  return <NavigationLayout noPadding>{children}</NavigationLayout>;
}
