import { User } from '@/modules/users/models/user';

export interface TokenPayload {
  sub: string;
  exp: string;
}

export interface Session extends TokenPayload {
  token: string;
  user: User;
}
