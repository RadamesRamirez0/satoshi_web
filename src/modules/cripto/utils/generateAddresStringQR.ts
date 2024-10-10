export interface GenerateAddressQRParams {
  currency: string;
  address: string;
  amount?: number;
}

export const generateAddressQR = ({
  currency,
  address,
  amount,
}: GenerateAddressQRParams): string => {
  let qr = `${currency.split(' ')[0].toLowerCase()}:${address}`;

  if (amount) {
    qr = `${qr}?amount=${amount}`;
  }

  return qr;
};
