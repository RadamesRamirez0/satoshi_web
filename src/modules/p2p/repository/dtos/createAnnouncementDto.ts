import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface CreateAnnouncementDTO {
  type: string;
  base: string;
  quote: string;
  amount: string;
  price?: string;
  price_type: 'fixed' | 'variable';
  market_price_difference?: number;
  minimum_order_size: string;
  maximum_order_size: string;
  payment_method: string;
  maximum_time_for_transaction_completion: number;
}

export type CreateAnnouncementResponse = ApiResponse<{ order_id: string }>;
