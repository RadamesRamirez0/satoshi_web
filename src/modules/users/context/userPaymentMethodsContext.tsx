import { createContext, FC, PropsWithChildren, useContext } from 'react';

import {
  useUserPaymentMethods,
  UseUserPaymentMethodsValues,
} from '@/modules/users/hooks/useUserPaymentMethods';

type UserPaymentMethodsContextValues = UseUserPaymentMethodsValues;
export const UserPaymentMethodsContext = createContext<UserPaymentMethodsContextValues>(
  {} as UserPaymentMethodsContextValues,
);

export const UserPaymentMethodsProvider: FC<PropsWithChildren> = ({ children }) => {
  const userPaymentMethods = useUserPaymentMethods();

  return (
    <UserPaymentMethodsContext.Provider value={userPaymentMethods}>
      {children}
    </UserPaymentMethodsContext.Provider>
  );
};

export const useUserPaymentMethodsContext = (): UserPaymentMethodsContextValues => {
  const context = useContext(UserPaymentMethodsContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error(
      'useUserPaymentMethodsContext must be used within UserPaymentMethodsProvider',
    );
  }

  return context;
};
