'use server';

// eslint-disable-next-line import/no-unresolved
import { Messages } from 'global';
import { getTranslations } from 'next-intl/server';

import { createSession } from '@/app/api/auth/lib/session';
import { login } from '@/app/api/auth/loginAction';
import { authRepository } from '@/modules/auth/repository';
import {
  RegisterDTO,
  RegisterResponse,
} from '@/modules/auth/repository/dtos/registerDto';

export const register = async (values: RegisterDTO): Promise<RegisterResponse> => {
  const t = await getTranslations('Register');

  const res = await authRepository.register(values);

  if (res.error) {
    let error: keyof Messages['Register'] = 'defaultError';
    if (res.error === 'Email already registered') {
      error = 'emailTakenError';
    }

    return { error: t(error), data: null };
  }

  const loginRes = await login({ username: values.email, password: values.password });

  if ('detail' in loginRes) {
    return { error: t('defaultError'), data: null };
  }

  createSession(loginRes.access_token);

  return res;
};
