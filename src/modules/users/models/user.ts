export interface User {
  id: string;
  email: string;
  is_active: boolean;
  email_is_verified: boolean;
  phone_number: string | null;
  phone_number_is_verified: boolean;
  partner_id: string;
}
