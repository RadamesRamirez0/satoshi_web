export interface UserAuthentication {
  access_token: string;
  token_type: string;
}

export interface FailedUserAuthentication {
  detail: string;
}
