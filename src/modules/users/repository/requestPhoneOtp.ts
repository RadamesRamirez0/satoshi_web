import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  RequestPhoneOtpDTO,
  RequestPhoneOtpResponse,
} from '@/modules/users/repository/dtos/requestPhoneOtpDto';

export const requestPhoneOtp: ApiEndpointPost<
  RequestPhoneOtpResponse,
  RequestPhoneOtpDTO
> = {
  url: '/v1/users/request-phone-otp',
  method: 'POST',
};
