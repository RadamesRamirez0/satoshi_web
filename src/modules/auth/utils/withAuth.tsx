import { cookies, headers } from 'next/headers';

import { redirect } from '@/modules/common/i18n/routing';

export const withAuth = (Component: React.ComponentType) => {
  return function WithAuth() {
    const sessionCookie = cookies().get('session')?.value;

    const headerList = headers();

    const pathName = headerList.get('x-current-path');

    if (!sessionCookie) {
      return redirect(`/auth/login${pathName ? `?redirectTo=${pathName}` : ''}`);
    }

    return <Component />;
  };
};
