export interface Order {
  id: string;
  order_type: string;
  creation_timestamp: string;
  maker_user_id: string;
  taker_user_id: string;
  partner_id: string;
  from_currency_id: string;
  to_currency_id: string;
  price: string;
  amount_in_from_currency: string;
  maker_fee: string;
  taker_fee: string;
  network_fee: string;
  status: string;
  destination_address: string;
  amount_to_send_in_to_currency: string;
  maximum_time_for_transaction_completion: number;
  payment_method_data: Record<string, string>;
  buyer_name: string;
  seller_name: string;
}
