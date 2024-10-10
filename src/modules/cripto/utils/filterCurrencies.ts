import { Currency } from '@/modules/cripto/models/currency';

export const getFiatCurrencies = (currencies: Currency[]): Currency[] =>
  currencies
    .filter((currency) => currency.type === 'fiat')
    .map((c) => ({ ...c, symbol: c.symbol.toUpperCase() }));

export const getCryptoCurrencies = (currencies: Currency[]): Currency[] =>
  currencies
    .filter((currency) => currency.type === 'crypto')
    .map((c) => ({ ...c, symbol: c.symbol.toUpperCase() }));
