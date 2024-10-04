import { useEffect, useState } from 'react';

import { getSession } from '@/app/api/auth/lib/session';

export interface UseSessionValues {
  token?: string;
}

export const useSession = (): UseSessionValues => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const session = getSession();
    if (session) {
      setToken(token);
    }
  }, []);

  return { token };
};
