import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  UpdateReferralDTO,
  UpdateReferralResponse,
} from '@/modules/users/repository/dtos/updateReferralDto';

export const updateReferral: ApiEndpointPut<UpdateReferralResponse, UpdateReferralDTO> = {
  url: '/v1/users/update-referal-code',
  method: 'PUT',
};
