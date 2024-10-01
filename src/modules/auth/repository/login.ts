import { LoginDTO, LoginResponse } from '@/modules/auth/repository/dtos/loginDto';
import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';

export const login: ApiEndpointPost<LoginResponse, LoginDTO> = {
  url: '/v1/users/login',
  method: 'POST',
  contentType: 'x-www-form-urlencoded',
};
