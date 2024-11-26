import { createRepository } from '@/modules/common/api/createRepository';
import { addPaymentMethod } from '@/modules/users/repository/addPaymentMethod';
import { confirmEmail } from '@/modules/users/repository/confirmEmail';
import { getPaymentMethods } from '@/modules/users/repository/getPaymentMethods';
import { updateAlias } from '@/modules/users/repository/updateAlias';
import { updatePassword } from '@/modules/users/repository/updatePassword';
import { updatePhone } from '@/modules/users/repository/updatePhone';
import { userMe } from '@/modules/users/repository/userMe';

const repository = {
  updatePassword,
  updatePhone,
  confirmEmail,
  userMe,
  getPaymentMethods,
  addPaymentMethod,
  updateAlias,
};

export const usersRepository = createRepository(repository);
