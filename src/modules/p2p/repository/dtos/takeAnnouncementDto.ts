import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { Order } from '@/modules/p2p/models/order';

export interface TakeAnnouncementDTO {
  order_id: string;
  amount_in_from_currency: string;
}

export type TakeAnnouncementResponse = ApiResponse<Order>;
