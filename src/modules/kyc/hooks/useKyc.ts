import { useEffect, useState } from 'react';

import { getKycToken } from '@/app/api/kyc/getKycTokenAction';
import { useSession } from '@/modules/auth/hooks/useSession';
import { KycToken } from '@/modules/kyc/models/kycToken';
import { usersRepository } from '@/modules/users/repository';

export interface UseKycValues {
  userId?: string;
  token?: string;
  loadingToken: boolean;
  error?: string;
}

export const useKyc = (): UseKycValues => {
  const session = useSession();
  const [kycToken, setKycToken] = useState<KycToken>();
  const [error, setError] = useState<string>();
  const [loadingToken, setLoadingToken] = useState<boolean>(false);

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    setLoadingToken(true);

    void usersRepository
      .userMe({ token: session.token })
      .then((r) => {
        void getKycToken(r.data?.id ?? '')
          .then((r) => {
            setKycToken(r);
          })
          .catch(() => {
            setError('Error');
          })
          .finally(() => {
            setLoadingToken(false);
          });
      })
      .finally(() => {
        setLoadingToken(false);
      });
  }, []);

  return {
    ...kycToken,
    loadingToken,
    error,
  };
};
