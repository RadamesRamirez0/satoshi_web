import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface UpdateAliasDTO {
  new_alias: string;
}

export type UpdateAliasResponse = ApiResponse<{ alias_updated: boolean }>;
