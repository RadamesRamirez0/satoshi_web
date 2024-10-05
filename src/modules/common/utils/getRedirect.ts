import { headers } from 'next/headers';

export const getRedirect = (currentPath?: string): string => {
  const referer = headers().get('referer');
  let redirectTo = '/';

  if (referer) {
    const refererUrl = new URL(referer);
    redirectTo =
      currentPath && refererUrl.pathname.includes(currentPath)
        ? '/'
        : `${refererUrl.pathname}`;
  }

  return redirectTo;
};
