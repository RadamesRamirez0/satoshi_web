import { createRepository } from '@/modules/common/api/createRepository';
import { confirmEmail } from '@/modules/users/repository/confirmEmail';
import { updatePassword } from '@/modules/users/repository/updatePassword';
import { updatePhone } from '@/modules/users/repository/updatePhone';

const repository = {
  updatePassword,
  updatePhone,
  confirmEmail,
};

export const usersRepository = createRepository(repository);
