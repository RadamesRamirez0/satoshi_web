import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface RequestWithdrawDTO {
  currency_id: string;
  amount: number;
  destination_address: string;
  destination_tag?: string;
}

export type RequestWithdrawResponse = ApiResponse<{
  id: string;
  currency_id: string;
  destination_address: string;
  total_amount: number;
  network_fee: string;
}>;
