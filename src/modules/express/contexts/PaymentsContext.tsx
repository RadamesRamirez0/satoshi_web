'use client';

import React, { createContext, FC, PropsWithChildren, useState } from 'react';

export interface PaymentsContextValues {
  selectedPaymentId?: string | null;
  setSelectedPaymentId: (paymentId?: string) => void;
}

export const PaymentsContext = createContext({} as PaymentsContextValues);

export const PaymentsProvider: FC<PropsWithChildren & { defaultPayment?: string }> = ({
  children,
  defaultPayment,
}) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | undefined>(
    defaultPayment,
  );

  return (
    <PaymentsContext.Provider value={{ selectedPaymentId, setSelectedPaymentId }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePaymentsContext = () => React.useContext(PaymentsContext);
