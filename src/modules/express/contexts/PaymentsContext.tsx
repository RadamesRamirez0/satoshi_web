'use client';

import React, { createContext, FC, PropsWithChildren } from 'react';

import {
  usePayments,
  UsePaymentsProps,
  UsePaymentsValues,
} from '@/modules/express/hooks/usePayments';

export const PaymentsContext = createContext({} as UsePaymentsValues);

export const PaymentsProvider: FC<PropsWithChildren & UsePaymentsProps> = ({
  children,
  ...props
}) => {
  const payments = usePayments(props);

  return <PaymentsContext.Provider value={payments}>{children}</PaymentsContext.Provider>;
};

export const usePaymentsContext = () => React.useContext(PaymentsContext);
