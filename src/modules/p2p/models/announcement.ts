export interface Announcement {
  id: string;
  user_id: string;
  user_alias: string;
  type: string;
  base: string;
  quote: string;
  amount: string;
  price: string;
  status: string;
  creation_time: string;
  use_satoshi_broker: boolean;
  price_type: string;
  market_price_difference: number;
  minimum_order_size: string;
  maximum_order_size: string;
  payment_method: string;
  maximum_time_for_transaction_completion: number;
}
