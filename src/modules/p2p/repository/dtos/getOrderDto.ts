import { Order } from '@/modules/p2p/models/order';

export interface GetOrderDTO {
  order_id: string;
}

export type GetOrderResponse = Order | { detail: string };
