import {
  RegisterDTO,
  RegisterResponse,
} from '@/modules/auth/repository/dtos/registerDto';
import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';

export const register: ApiEndpointPost<RegisterResponse, RegisterDTO> = {
  method: 'POST',
  url: '/v1/users/register',
};
