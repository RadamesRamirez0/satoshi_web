import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { Message } from '@/modules/p2p/models/message';

export interface GetMessagesDTO {
  operation_id: string;
}

export type GetMessagesResponse = ApiResponse<Message[]>;
