import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  SendMessageDTO,
  SendMessageResponse,
} from '@/modules/p2p/repository/dtos/sendMessageDto';

export const sendMessage: ApiEndpointPost<SendMessageResponse, SendMessageDTO> = {
  url: '/v1/chat/messages/',
};
