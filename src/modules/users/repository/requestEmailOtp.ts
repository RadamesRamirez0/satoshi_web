import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  RequestEmailOtpDTO,
  RequestEmailOtpResponse,
} from '@/modules/users/repository/dtos/requestEmailOtpDto';

export const requestEmailOtp: ApiEndpointPost<
  RequestEmailOtpResponse,
  RequestEmailOtpDTO
> = {
  url: '/v1/users/request-email-otp',
  method: 'POST',
};
