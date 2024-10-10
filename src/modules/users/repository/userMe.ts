import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import { UserMeResponse } from '@/modules/users/repository/dtos/userMeDto';

export const userMe: ApiEndpointGet<UserMeResponse> = {
  url: '/v1/users/me',
  method: 'GET',
};
