import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { PaymentMethodsResponse } from '@/modules/p2p/repository/dtos/paymentMethodsDto';

export const paymentMethods: ApiEndpointGet<PaymentMethodsResponse> = {
  url: '/v1/payment_methods/list',
  method: 'GET',
};
