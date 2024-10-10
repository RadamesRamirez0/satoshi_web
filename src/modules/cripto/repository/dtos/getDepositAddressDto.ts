import { DepositAddress } from '@/modules/cripto/models/depositAddress';

export interface GetDepositAddressDTO {
  currency: string;
}

export type GetDepositAddressResponse = DepositAddress;
