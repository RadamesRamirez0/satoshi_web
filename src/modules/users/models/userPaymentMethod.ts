export interface UserPaymentMethod {
  id: string;
  user_id: string;
  payment_method_id: string;
  payment_method_data: Record<string, string>;
  creation_time: string;
  last_update_time: string | null;
  enable: boolean;
}
