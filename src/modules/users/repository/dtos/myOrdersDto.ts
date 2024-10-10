import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { Order } from '@/modules/p2p/views/P2PView';

export type MyOrdersResponse = ApiResponse<Order[]> | { detail: string };
