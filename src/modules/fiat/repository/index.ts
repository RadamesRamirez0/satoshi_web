import { createRepository } from '@/modules/common/api/createRepository';
import { getPriceEstimation } from '@/modules/fiat/repository/getPriceEstimation';

const endpoints = {
  getPriceEstimation,
};

export const fiatRepository = createRepository(endpoints);
