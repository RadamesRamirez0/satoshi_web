export interface TokenPayload {
  sub: string;
  exp: string;
}

export interface TokenWithPayload extends TokenPayload {
  token: string;
}
