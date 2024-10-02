import { PaymentMethods } from '@/modules/express/models/paymentMethods';

export interface PriceEstimation {
  base_currency: string;
  quote_currency: string;
  order_type: string;
  price: string;
  minimum_order_amount: string;
  maximum_order_amount: string;
  fee_percentage: string;
  network_fee: string;
  payment_method: PaymentMethods;
  amount_in_quote_currency: string;
}
