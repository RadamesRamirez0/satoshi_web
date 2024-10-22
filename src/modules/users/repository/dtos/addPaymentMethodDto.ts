import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';

export interface AddPaymentMethodDTO {
  id_payment_method: string;
  payment_method_data: Record<string, string>;
}

export type AddPaymentMethodResponse = ApiResponse<UserPaymentMethod>;
