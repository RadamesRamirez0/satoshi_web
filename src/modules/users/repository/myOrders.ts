import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { MyOrdersResponse } from '@/modules/users/repository/dtos/myOrdersDto';

export const myOrders: ApiEndpointGet<MyOrdersResponse> = {
  url: '/v1/fiat-ramp/my-orders',
  method: 'GET',
};
