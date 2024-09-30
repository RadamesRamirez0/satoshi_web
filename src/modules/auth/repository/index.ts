import { forgotPassword } from '@/modules/auth/repository/forgotPassword';
import { login } from '@/modules/auth/repository/login';
import { register } from '@/modules/auth/repository/register';
import { createRepository } from '@/modules/common/api/createRepository';

const repository = {
  login,
  register,
  forgotPassword,
};

export const authRepository = createRepository(repository);
