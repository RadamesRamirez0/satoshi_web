import { createRepository } from '@/modules/common/api/createRepository';
import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  PriceEstimationDTO,
  PriceEstimationResponse,
} from '@/modules/express/repository/dtos/priceEstimationDto';

export const getPriceEstimation: ApiEndpointGet<
  PriceEstimationResponse,
  PriceEstimationDTO
> = {
  method: 'GET',
  url: '/v1/fiat-ramp/price_estimation',
};

export const fiatRamp = createRepository({ getPriceEstimation });
