import { useEffect, useState } from 'react';

import { getSession } from '@/app/api/auth/sessionAction';

export interface UseSessionValues {
  token?: string;
}

export const useSession = (): UseSessionValues => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    void getSession().then((session) => {
      if (session) {
        setToken(session.token);
      }
    });
  }, []);

  return { token };
};
