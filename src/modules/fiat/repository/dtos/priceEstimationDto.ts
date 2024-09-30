import { OrderType } from '@/modules/fiat/models/orderType';
import { PaymentMethods } from '@/modules/fiat/models/paymentMethods';
import { PriceEstimation } from '@/modules/fiat/models/priceEstimation';

export interface PriceEstimationDTO {
  base_currency: string;
  quote_currency: string;
  order_type: OrderType;
  payment_method: PaymentMethods;
  amount_in_quoute_currency?: string;
}

export type PriceEstimationResponse = PriceEstimation;
