'use server';

import { getTranslations } from 'next-intl/server';

import { createSession } from '@/app/api/auth/lib/session';
import { authRepository } from '@/modules/auth/repository';
import { LoginDTO, LoginResponse } from '@/modules/auth/repository/dtos/loginDto';

export const login = async ({
  username,
  password,
}: Pick<LoginDTO, 'username' | 'password'>): Promise<LoginResponse> => {
  const t = await getTranslations('Login');

  const res = await authRepository.login({
    body: { grant_type: 'password', username, password },
  });

  if ('detail' in res) {
    return { detail: t('defaultError') };
  }

  await createSession(res.access_token);

  return res;
};
