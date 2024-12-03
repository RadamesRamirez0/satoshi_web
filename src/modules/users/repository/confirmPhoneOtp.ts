import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  ConfirmPhoneOtpDTO,
  ConfirmPhoneOtpResponse,
} from '@/modules/users/repository/dtos/confirmPhoneOtpDto';

export const confirmPhoneOtp: ApiEndpointPut<
  ConfirmPhoneOtpResponse,
  ConfirmPhoneOtpDTO
> = {
  url: '/v1/users/confirm-phone-otp',
  method: 'PUT',
};
