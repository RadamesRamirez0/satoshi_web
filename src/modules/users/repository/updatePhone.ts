import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  UpdatePhoneDTO,
  UpdatePhoneResponse,
} from '@/modules/users/repository/dtos/updatePhoneDto';

export const updatePhone: ApiEndpointPut<UpdatePhoneResponse, UpdatePhoneDTO> = {
  url: '/v1/users/update-phone-number',
};
