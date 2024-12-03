import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  UpdatePasswordDTO,
  UpdatePasswordResponse,
} from '@/modules/users/repository/dtos/updatePasswordDto';

export const updatePassword: ApiEndpointPut<UpdatePasswordResponse, UpdatePasswordDTO> = {
  url: '/v1/users/update-password',
  method: 'PUT',
};
