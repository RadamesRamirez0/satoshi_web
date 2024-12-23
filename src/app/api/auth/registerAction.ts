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

  const res = await authRepository.register({ body: values });

  if (res.error) {
    let error: keyof Messages['Register'] = 'defaultError';
    if (res.error === 'Email already registered') {
      error = 'emailTakenError';
    }
    if (res.error === 'A valid invitation code is required.') {
      error = 'invitationError';
    }

    return { error: t(error), data: null };
  }

  const loginRes = await login({ username: values.email, password: values.password });

  if ('detail' in loginRes) {
    console.log(JSON.stringify(res));

    return { error: t('defaultError'), data: null };
  }

  await createSession(loginRes.access_token);

  return res;
};
