import { Order } from '@/modules/p2p/models/order';

export type MyOrdersResponse = Order[] | { detail: string };
