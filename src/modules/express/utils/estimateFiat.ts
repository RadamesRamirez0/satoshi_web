import { truncateDecimals } from '@/modules/common/utils/truncate';

export const estimateBase = (quote: string, price: string, fee: string): string => {
  const formatedQuote = truncateDecimals(parseFloat(quote), 2);
  const formatedPrice = parseFloat(price);

  const receive = formatedQuote / formatedPrice;

  const base = truncateDecimals(receive, 8);

  const baseWithoutFee = base - base * parseFloat(fee);

  return baseWithoutFee.toFixed(8).toString();
};

export const estimateQuote = (base: string, price: string, fee: string): string => {
  const formatedBase = truncateDecimals(parseFloat(base), 8);
  const formatedPrice = parseFloat(price);

  const pay = formatedBase * formatedPrice;

  const quote = truncateDecimals(pay, 2);

  const quotePlusFee = quote + quote * parseFloat(fee);

  return quotePlusFee.toFixed(2).toString();
};

export const estimateFeeWithBase = (base: string, fee: string): string => {
  const formatedBase = truncateDecimals(parseFloat(base), 8);

  const feee = formatedBase * (parseFloat(fee) / 100);

  return feee.toString();
};

export const estimateFeeWithQuote = (
  quote: string,
  price: string,
  fee: string,
): string => {
  const formatedQuote = truncateDecimals(parseFloat(quote), 2);
  const formatedPrice = parseFloat(price);

  const receive = formatedQuote / formatedPrice;

  const base = truncateDecimals(receive, 8);

  const feee = base * (parseFloat(fee) / 100);

  return feee.toString();
};
