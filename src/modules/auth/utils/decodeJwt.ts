import { TokenPayload } from '@/modules/auth/types/tokenPayload';

export const decodeJwt = (token: string): TokenPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(atob(base64)) as TokenPayload;
};
