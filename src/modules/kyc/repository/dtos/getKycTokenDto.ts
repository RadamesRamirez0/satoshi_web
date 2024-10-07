import { KycToken } from '@/modules/kyc/models/kycToken';

export interface GetKycTokenDTO {
  userId: string;
  levelName: string;
  ttlInSecs: number;
}

export type GetKycTokenResponse = KycToken;
