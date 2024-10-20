import { ApiEndpointPatch } from '@/modules/common/interfaces/apiEndpoint';
import { ReleasePaidOrderDTO } from '@/modules/p2p/repository/dtos/releasePaidOrderDto';

export const releasePaidOrder: ApiEndpointPatch<unknown, ReleasePaidOrderDTO> = {
  url: '/v1/fiat-ramp/release_paid_order',
  method: 'PATCH',
};
