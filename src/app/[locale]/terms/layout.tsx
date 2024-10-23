import { PropsWithChildren } from 'react';

import NavigationLayout from '@/modules/common/shared-ui/layouts/NavigationLayout';

export default function TermsLayout({ children }: PropsWithChildren) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
