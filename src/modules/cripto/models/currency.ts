export interface Currency {
  id: string;
  symbol: string;
  name: string;
  description: string;
  type: CurrencyType;
  precision: number;
  deposits_enable: number;
  withdrawals_enable: number;
}

export type CurrencyType = 'fiat' | 'crypto';
