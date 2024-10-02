import { cookies } from 'next/headers';

import { TokenWithPayload } from '@/modules/auth/types/tokenPayload';
import { decodeJwt } from '@/modules/auth/utils/decodeJwt';

export const createSession = (bearer: string): void => {
  const payload = decodeJwt(bearer);

  cookies().set('session', bearer, {
    value: bearer,
    httpOnly: true,
    secure: true,
    expires: new Date(parseInt(payload.exp, 10) * 1000),
    sameSite: 'none',
    path: '/',
  });
};

export const deleteSession = (): void => {
  cookies().delete('session');
};

export const getSession = (): TokenWithPayload | null => {
  const sessionCookie = cookies().get('session');
  if (sessionCookie) {
    const bearerToken = sessionCookie.value;
    const sessionData = decodeJwt(bearerToken);

    return { token: bearerToken, ...sessionData };
  }

  return null;
};
