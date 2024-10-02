import { User } from 'next-auth';

export interface UserAuthenticated extends User {
  token: string;
}
