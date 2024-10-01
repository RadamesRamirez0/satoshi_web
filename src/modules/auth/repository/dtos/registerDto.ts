import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { User } from '@/modules/users/models/user';

export interface RegisterDTO {
  email: string;
  password: string;
  partner_id: string;
}

export type RegisterResponse = ApiResponse<User>;
