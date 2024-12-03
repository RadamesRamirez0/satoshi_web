export interface RequestPhoneOtpDTO {
  purpose: string;
}

export type RequestPhoneOtpResponse = { message: string } | { error: string };
