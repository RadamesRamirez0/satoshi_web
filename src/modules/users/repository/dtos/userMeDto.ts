import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { User } from '@/modules/users/models/user';

export type UserMeResponse = ApiResponse<User>;
