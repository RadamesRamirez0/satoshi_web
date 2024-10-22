import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';

export type GetPaymentMethodsResponse = ApiResponse<UserPaymentMethod[]>;
