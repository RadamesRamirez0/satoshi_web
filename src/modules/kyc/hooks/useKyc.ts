import { useEffect, useState } from 'react';

import { getKycToken } from '@/app/api/kyc/getKycTokenAction';
import { KycToken } from '@/modules/kyc/models/kycToken';

export interface UseKycValues {
  userId?: string;
  token?: string;
  loadingToken: boolean;
  error?: string;
}

export const useKyc = (): UseKycValues => {
  const [kycToken, setKycToken] = useState<KycToken>();
  const [error, setError] = useState<string>();
  const [loadingToken, setLoadingToken] = useState<boolean>(false);

  useEffect(() => {
    setLoadingToken(true);
    void getKycToken('userId')
      .then((r) => {
        setKycToken(r);
        setLoadingToken(false);
      })
      .catch(() => {
        setError('Error');
        setLoadingToken(false);
      });
  }, []);

  return {
    ...kycToken,
    loadingToken,
    error,
  };
};
