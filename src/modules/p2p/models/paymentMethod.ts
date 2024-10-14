export interface PaymentMethod {
  name: string;
  description: string;
  enable: boolean;
  required_data: Record<string, string>;
  id: string;
}
