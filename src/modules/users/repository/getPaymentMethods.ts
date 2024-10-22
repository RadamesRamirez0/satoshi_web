import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { GetPaymentMethodsResponse } from '@/modules/users/repository/dtos/getPaymentMethodsDto';

export const getPaymentMethods: ApiEndpointGet<GetPaymentMethodsResponse> = {
  method: 'GET',
  url: '/v1/payment_methods/users_payment_methods',
};
