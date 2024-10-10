import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetDepositAddressDTO,
  GetDepositAddressResponse,
} from '@/modules/cripto/repository/dtos/getDepositAddressDto';

export const getDepositAddress: ApiEndpointGet<
  GetDepositAddressResponse,
  GetDepositAddressDTO
> = {
  url: '/v1/assets/deposit_address',
  method: 'GET',
};
