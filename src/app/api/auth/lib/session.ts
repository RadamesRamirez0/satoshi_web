import { cookies } from 'next/headers';

import { decodeJwt } from '@/modules/auth/utils/decodeJwt';

export const createSession = (bearer: string): void => {
  const payload = decodeJwt(bearer);

  console.log(payload);

  cookies().set('session', bearer, {
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
