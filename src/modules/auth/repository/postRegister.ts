import { PostRegisterDTO } from '@/modules/auth/repository/dtos/postRegisterDto';
import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';

export const postRegister: ApiEndpointPost<string, PostRegisterDTO> = {
  url: '/v1/users/register',
};
