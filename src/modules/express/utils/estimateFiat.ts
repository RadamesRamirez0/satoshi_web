import { truncateDecimals } from '@/modules/common/utils/truncate';

export const estimateBase = (quote: string, price: string): string => {
  const formatedQuote = truncateDecimals(parseFloat(quote), 2);
  const formatedPrice = parseFloat(price);

  const receive = formatedQuote / formatedPrice;

  const base = truncateDecimals(receive, 8);

  return base.toString();
};

export const estimateQuote = (base: string, price: string): string => {
  const formatedBase = truncateDecimals(parseFloat(base), 8);
  const formatedPrice = parseFloat(price);

  const pay = formatedBase * formatedPrice;

  const quote = truncateDecimals(pay, 2);

  return quote.toString();
};
