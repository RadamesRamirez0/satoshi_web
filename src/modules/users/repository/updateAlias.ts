import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  UpdateAliasDTO,
  UpdateAliasResponse,
} from '@/modules/users/repository/dtos/updateAliasDto';

export const updateAlias: ApiEndpointPut<UpdateAliasResponse, UpdateAliasDTO> = {
  url: '/v1/users/update-alias',
  method: 'PUT',
};
