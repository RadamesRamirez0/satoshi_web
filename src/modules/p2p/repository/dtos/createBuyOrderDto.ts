import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface CreateBuyOrderDTO {
  from_currency_id: string;
  to_currency_id: string;
  amount_in_from_currency: string;
  payment_method_id: string;
  destination_address?: string;
}

export type CreateBuyOrderResponse = ApiResponse<unknown>;
