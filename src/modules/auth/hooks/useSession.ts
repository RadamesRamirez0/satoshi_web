import { useEffect, useState } from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import { Session } from '@/modules/auth/types/tokenPayload';

export type UseSessionValues = Session | undefined;

export const useSession = (): UseSessionValues => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    void getSession().then((session) => {
      if (session) {
        setSession(session);
      }
    });
  }, []);

  return session;
};
