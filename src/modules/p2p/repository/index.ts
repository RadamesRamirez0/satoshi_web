import { createRepository } from '@/modules/common/api/createRepository';
import { paymentMethods } from '@/modules/p2p/repository/paymentMethods';

const repository = {
  paymentMethods,
};

export const p2pRepository = createRepository(repository);
