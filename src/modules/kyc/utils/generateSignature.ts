import crypto from 'crypto';

import { KycApiSecret } from '@/modules/kyc/constants/secrets';

export interface GenerateSignatureParams {
  ts: string;
  method: string;
  url: string;
  data: unknown;
}

export const generateKycSignature = ({
  ts,
  data,
  method,
  url,
}: GenerateSignatureParams): string => {
  const signature = crypto.createHmac('sha256', KycApiSecret);
  signature.update(ts + method + url);

  if (data) {
    signature.update(JSON.stringify(data));
  }

  return signature.digest('hex');
};
