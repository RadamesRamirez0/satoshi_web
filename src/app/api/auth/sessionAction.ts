'use server';

import { getSession as s } from '@/app/api/auth/lib/session';
import { Session } from '@/modules/auth/types/tokenPayload';

// eslint-disable-next-line @typescript-eslint/require-await
export const getSession = async (): Promise<Session | null> => s();
