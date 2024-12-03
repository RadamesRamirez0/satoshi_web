import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface ConfirmPhoneOtpDTO {
  purpose: string;
  otp_code: string;
}

export type ConfirmPhoneOtpResponse = ApiResponse<{ confirmed: boolean }>;
