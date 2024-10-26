import { cookies } from 'next/headers';

import { Session } from '@/modules/auth/types/tokenPayload';
import { decodeJwt } from '@/modules/auth/utils/decodeJwt';
import { usersRepository } from '@/modules/users/repository';

export const createSession = async (bearer: string): Promise<void> => {
  const payload = decodeJwt(bearer);

  const user = await usersRepository.userMe({ token: bearer });

  if (!user.data) {
    return;
  }

  const value = {
    token: bearer,
    user: user.data,
    ...payload,
  };

  cookies().set('session', bearer, {
    value: JSON.stringify(value),
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

export const getSession = (): Session | null => {
  const sessionCookie = cookies().get('session');
  if (sessionCookie) {
    const session = sessionCookie.value;

    try {
      const sessionData = JSON.parse(session) as Session;

      return sessionData;
    } catch (error) {
      console.error(error);
    }
  }

  return null;
};
