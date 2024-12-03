import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface SendMessageDTO {
  operation_id: string;
  message: string;
  file: string;
}

export type SendMessageResponse = ApiResponse<{ message_id: string }>;
