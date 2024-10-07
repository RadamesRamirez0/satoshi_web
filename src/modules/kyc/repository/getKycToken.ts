import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetKycTokenDTO,
  GetKycTokenResponse,
} from '@/modules/kyc/repository/dtos/getKycTokenDto';

export const getKycToken: ApiEndpointPost<GetKycTokenResponse, GetKycTokenDTO> = {
  method: 'POST',
  url: '/resources/accessTokens/sdk',
};
