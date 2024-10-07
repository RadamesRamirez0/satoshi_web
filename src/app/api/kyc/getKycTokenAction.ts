'use server';

import { KycApiToken } from '@/modules/kyc/constants/secrets';
import { kycRepository } from '@/modules/kyc/repository';
import { GetKycTokenResponse } from '@/modules/kyc/repository/dtos/getKycTokenDto';
import { generateKycSignature } from '@/modules/kyc/utils/generateSignature';
import { generateTs } from '@/modules/kyc/utils/generateTs';

export const getKycToken = async (userId: string): Promise<GetKycTokenResponse> => {
  const ts = generateTs();
  const data = {
    userId,
    levelName: 'basic-kyc-level',
    ttlInSecs: 600,
  };

  const signature = generateKycSignature({
    ts,
    method: 'POST',
    url: '/resources/accessTokens/sdk',
    data,
  });

  const res = await kycRepository.getKycToken(data, undefined, undefined, {
    'X-App-Token': KycApiToken,
    'X-App-Access-Ts': ts,
    'X-App-Access-Sig': signature,
  });

  return res;
};
