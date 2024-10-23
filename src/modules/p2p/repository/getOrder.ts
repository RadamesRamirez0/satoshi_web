import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { GetOrderDTO, GetOrderResponse } from '@/modules/p2p/repository/dtos/getOrderDto';

export const getOrder: ApiEndpointGet<GetOrderResponse, undefined, GetOrderDTO> = {
  url: '/v1/fiat-ramp/view_order/{order_id}',
  method: 'GET',
};
