import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';

export type PaymentMethodsResponse = ApiResponse<PaymentMethod[]>;
