import { useEffect, useState } from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import { Session } from '@/modules/auth/types/tokenPayload';

export type UseSessionValues = Session | undefined;

export const useSession = (): UseSessionValues => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    if (session) {
      return;
    }

    const localSession = localStorage.getItem('session');
    if (localSession) {
      setSession(JSON.parse(localSession) as Session);
    }

    void getSession().then((session) => {
      if (session) {
        setSession(session);
        localStorage.setItem('session', JSON.stringify(session));
      }
    });
  }, []);

  return session;
};
