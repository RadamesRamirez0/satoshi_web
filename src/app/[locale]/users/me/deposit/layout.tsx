import { PropsWithChildren } from 'react';

import NavigationLayout from '@/modules/common/shared-ui/layouts/NavigationLayout';

export default function DepositLayout({ children }: PropsWithChildren) {
  return <NavigationLayout noPadding>{children}</NavigationLayout>;
}
