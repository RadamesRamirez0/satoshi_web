export const estimateBase = (quote: string, price: string): string => {
  const formatedQuote = Math.trunc(parseFloat(quote) * 100) / 100;
  const formatedPrice = parseFloat(price);

  const receive = formatedQuote / formatedPrice;

  const base = Math.trunc(receive * 100000000) / 100000000;

  return base.toString();
};

export const estimateQuote = (base: string, price: string): string => {
  const formatedBase = Math.trunc(parseFloat(base) * 100000000) / 100000000;
  const formatedPrice = parseFloat(price);

  const pay = formatedBase * formatedPrice;

  const quote = Math.trunc(pay * 100) / 100;

  return quote.toString();
};
