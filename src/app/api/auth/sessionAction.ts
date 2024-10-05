'use server';

import { getSession as s } from '@/app/api/auth/lib/session';
import { TokenWithPayload } from '@/modules/auth/types/tokenPayload';

// eslint-disable-next-line @typescript-eslint/require-await
export const getSession = async (): Promise<TokenWithPayload | null> => s();
