import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  AddPaymentMethodDTO,
  AddPaymentMethodResponse,
} from '@/modules/users/repository/dtos/addPaymentMethodDto';

export const addPaymentMethod: ApiEndpointPost<
  AddPaymentMethodResponse,
  AddPaymentMethodDTO
> = {
  url: '/v1/payment_methods/users_payment_methods',
  method: 'POST',
};
