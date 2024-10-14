import { truncateDecimals } from '@/modules/common/utils/truncate';

export const estimateBase = (quote: string, price: string, fee: string): string => {
  const formatedQuote = truncateDecimals(parseFloat(quote), 2);
  const formatedPrice = parseFloat(price);

  const receive = formatedQuote / formatedPrice;

  const base = truncateDecimals(receive, 8);

  const baseWithoutFee = base - base * parseFloat(fee);

  return baseWithoutFee.toString();
};

export const estimateQuote = (base: string, price: string, fee: string): string => {
  const formatedBase = truncateDecimals(parseFloat(base), 8);
  const formatedPrice = parseFloat(price);

  const pay = formatedBase * formatedPrice;

  const quote = truncateDecimals(pay, 2);

  const quotePlusFee = quote + quote * parseFloat(fee);

  return quotePlusFee.toString();
};

export const estimateFeeWithBase = (base: string, fee: string): string => {
  const formatedBase = truncateDecimals(parseFloat(base), 8);

  const feee = formatedBase / (1 - parseFloat(fee)) - formatedBase;

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

  const feee = base * parseFloat(fee);

  return feee.toString();
};
