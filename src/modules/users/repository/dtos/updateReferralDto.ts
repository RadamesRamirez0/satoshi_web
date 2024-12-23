import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface UpdateReferralDTO {
  new_referal_code: string;
}

export type UpdateReferralResponse = ApiResponse<{ referal_code_updated: boolean }>;
