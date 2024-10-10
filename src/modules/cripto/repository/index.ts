import { createRepository } from '@/modules/common/api/createRepository';
import { getCurrencies } from '@/modules/cripto/repository/getCurrencies';
import { getDepositAddress } from '@/modules/cripto/repository/getDepositAddress';

const repository = {
  getCurrencies,
  getDepositAddress,
};

export const criptoRepository = createRepository(repository);
