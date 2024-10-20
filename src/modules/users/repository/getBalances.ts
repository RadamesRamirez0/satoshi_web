import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { GetBalancesResponse } from '@/modules/users/repository/dtos/getBalancesDto';

export const getBalances: ApiEndpointGet<GetBalancesResponse> = {
  url: '/v1/assets/balances',
  method: 'GET',
};
