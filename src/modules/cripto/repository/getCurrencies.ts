import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetCurrencyDTO,
  GetCurrencyResponse,
} from '@/modules/cripto/repository/dtos/getCurrencyDto';

export const getCurrencies: ApiEndpointGet<GetCurrencyResponse, GetCurrencyDTO> = {
  url: '/v1/assets/currencies',
  method: 'GET',
};
