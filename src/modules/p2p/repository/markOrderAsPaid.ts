import { ApiEndpointPatch } from '@/modules/common/interfaces/apiEndpoint';
import { MarkOrderAsPaidDTO } from '@/modules/p2p/repository/dtos/markOrderAsPaidDto';

export const markOrderAsPaid: ApiEndpointPatch<unknown, MarkOrderAsPaidDTO> = {
  url: '/v1/fiat-ramp/mark_order_as_paid',
  method: 'PATCH',
};
