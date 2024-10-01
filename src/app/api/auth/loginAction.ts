'use server';

import { getTranslations } from 'next-intl/server';

import { createSession } from '@/app/api/auth/lib/session';
import { FailedUserAuthentication } from '@/modules/auth/models/userAuthentication';
import { authRepository } from '@/modules/auth/repository';
import { LoginDTO } from '@/modules/auth/repository/dtos/loginDto';
import { redirect } from '@/modules/common/i18n/routing';

export const login = async ({
  username,
  password,
}: Pick<LoginDTO, 'username' | 'password'>): Promise<FailedUserAuthentication | void> => {
  const t = await getTranslations('Login');

  const res = await authRepository.login({
    grant_type: 'password',
    username,
    password,
  });

  if ('detail' in res) {
    return { detail: t('defaultError') };
  }

  createSession(res.access_token);
  redirect('/users/me');
};
