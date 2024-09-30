import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  ConfirmEmailDTO,
  ConfirmEmailResponse,
} from '@/modules/users/repository/dtos/confirmEmailDto';

export const confirmEmail: ApiEndpointPut<ConfirmEmailResponse, ConfirmEmailDTO> = {
  url: '/v1/users/confirm-email',
};
