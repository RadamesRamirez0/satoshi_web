import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface UpdatePhoneDTO {
  new_phone_number: string;
}

export type UpdatePhoneResponse = ApiResponse<{
  phone_number_updated: boolean;
}>;
