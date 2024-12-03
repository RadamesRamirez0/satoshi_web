import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export type ConfirmEmailDTO = {
  otp_code: string;
  purpose: string;
};
export type ConfirmEmailResponse = ApiResponse<{
  confirmed: true;
}>;
