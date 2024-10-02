import { createRepository } from '@/modules/common/api/createRepository';
import { getPriceEstimation } from '@/modules/express/repository/getPriceEstimation';

const endpoints = {
  getPriceEstimation,
};

export const expressRepository = createRepository(endpoints);
