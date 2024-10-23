import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  CreateBuyOrderDTO,
  CreateBuyOrderResponse,
} from '@/modules/p2p/repository/dtos/createBuyOrderDto';

export const createBuyOrder: ApiEndpointPost<CreateBuyOrderResponse, CreateBuyOrderDTO> =
  {
    url: '/v1/fiat-ramp/create_order',
    method: 'POST',
  };
