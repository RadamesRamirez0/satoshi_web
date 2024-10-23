import { Order } from '@/modules/p2p/models/order';

export type GetOrderResponse = Order | { detail: string };
