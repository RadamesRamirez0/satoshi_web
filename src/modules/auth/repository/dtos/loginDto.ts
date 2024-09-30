import { UserAuthentication } from '@/modules/auth/models/userAuthentication';

export interface LoginDTO {
  grant_type: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export type LoginResponse = UserAuthentication;
