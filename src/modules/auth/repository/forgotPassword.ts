import {
  ForgotPasswordDTO,
  ForgotPasswordResponse,
} from '@/modules/auth/repository/dtos/forgotPasswordDto';
import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';

export const forgotPassword: ApiEndpointPost<ForgotPasswordResponse, ForgotPasswordDTO> =
  {
    url: '/v1/users/forgot-password',
  };
