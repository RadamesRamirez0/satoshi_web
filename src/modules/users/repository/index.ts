import { createRepository } from '@/modules/common/api/createRepository';
import { addPaymentMethod } from '@/modules/users/repository/addPaymentMethod';
import { confirmEmail } from '@/modules/users/repository/confirmEmail';
import { confirmPhoneOtp } from '@/modules/users/repository/confirmPhoneOtp';
import { getPaymentMethods } from '@/modules/users/repository/getPaymentMethods';
import { requestEmailOtp } from '@/modules/users/repository/requestEmailOtp';
import { requestPhoneOtp } from '@/modules/users/repository/requestPhoneOtp';
import { requestWithdraw } from '@/modules/users/repository/requestWithdraw';
import { updateAlias } from '@/modules/users/repository/updateAlias';
import { updatePassword } from '@/modules/users/repository/updatePassword';
import { updatePhone } from '@/modules/users/repository/updatePhone';
import { userMe } from '@/modules/users/repository/userMe';

const repository = {
  updatePassword,
  updatePhone,
  requestEmailOtp,
  confirmEmail,
  userMe,
  getPaymentMethods,
  addPaymentMethod,
  updateAlias,
  requestPhoneOtp,
  confirmPhoneOtp,
  requestWithdraw,
};

export const usersRepository = createRepository(repository);
