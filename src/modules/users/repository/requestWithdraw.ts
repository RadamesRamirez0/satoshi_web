import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  RequestWithdrawDTO,
  RequestWithdrawResponse,
} from '@/modules/users/repository/dtos/requestWithdrawDto';

export const requestWithdraw: ApiEndpointPost<
  RequestWithdrawResponse,
  RequestWithdrawDTO
> = {
  url: '/v1/assets/withdraw_requests/',
  method: 'POST',
};
