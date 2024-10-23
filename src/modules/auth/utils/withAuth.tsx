import { cookies, headers } from 'next/headers';
import { ComponentType } from 'react';

import { redirect } from '@/modules/common/i18n/routing';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function WithAuth(props: P): JSX.Element | null {
    const sessionCookie = cookies().get('session')?.value;
    const headerList = headers();
    const pathName = headerList.get('x-current-path');

    if (!sessionCookie) {
      redirect(`/auth/login${pathName ? `?redirectTo=${pathName}` : ''}`);

      return null; // Aseguramos que no se renderice nada si redirecciona
    }

    return <Component {...props} />;
  };
};
