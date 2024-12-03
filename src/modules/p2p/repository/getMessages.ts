import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetMessagesDTO,
  GetMessagesResponse,
} from '@/modules/p2p/repository/dtos/getMessagesDto';

export const getMessages: ApiEndpointGet<GetMessagesResponse, undefined, GetMessagesDTO> =
  {
    url: '/v1/chat/messages/{operation_id}',
    method: 'GET',
  };
