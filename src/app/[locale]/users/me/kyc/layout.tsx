import { PropsWithChildren } from 'react';

import NavigationLayout from '@/modules/common/shared-ui/layouts/NavigationLayout';

export default function KYCLayout({ children }: PropsWithChildren) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
