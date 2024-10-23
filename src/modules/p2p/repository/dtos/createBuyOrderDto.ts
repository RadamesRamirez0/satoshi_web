import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { OrderType } from '@/modules/express/models/orderType';
import { Order } from '@/modules/p2p/models/order';

export interface CreateBuyOrderDTO {
  from_currency_id: string;
  to_currency_id: string;
  amount_in_from_currency: string;
  payment_method_id: string;
  destination_address?: string;
  order_type: OrderType;
}

export type CreateBuyOrderResponse = ApiResponse<Order>;
