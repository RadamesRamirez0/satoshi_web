export interface RequestEmailOtpDTO {
  purpose: string;
}

export type RequestEmailOtpResponse = { message: string } | { error: string };
