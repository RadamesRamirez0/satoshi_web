import { createRepository } from '@/modules/common/api/createRepository';
import { getCurrencies } from '@/modules/cripto/repository/getCurrencies';

const repository = {
  getCurrencies,
};

export const criptoRepository = createRepository(repository);
