import {
  ForgotPasswordDTO,
  ForgotPasswordResponse,
} from '@/modules/auth/repository/dtos/forgotPasswordDto';
import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export const forgotPassword: ApiEndpointPost<
  ApiResponse<ForgotPasswordResponse>,
  ForgotPasswordDTO
> = {
  url: '/v1/users/forgot-password',
  method: 'POST',
};
