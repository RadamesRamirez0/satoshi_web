import { ApiErrorResponse, ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { OrderType } from '@/modules/express/models/orderType';
import { PriceEstimation } from '@/modules/express/models/priceEstimation';

export interface PriceEstimationDTO {
  base_currency: string;
  quote_currency: string;
  order_type: OrderType;
  payment_method?: string;
  amount_in_quote_currency?: string;
}

export type PriceEstimationResponse = ApiResponse<PriceEstimation> | ApiErrorResponse;
