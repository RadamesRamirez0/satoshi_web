import React, { createContext, FC, PropsWithChildren } from 'react';

import useExpress, { UseExpressValues } from '@/modules/express/hooks/useExpress';

export type ExpressContextValues = UseExpressValues;

export const ExpressContext = createContext({} as ExpressContextValues);

export type ExpressProviderProps = PropsWithChildren;

export const ExpressProvider: FC<ExpressProviderProps> = ({ children }) => {
  const uE = useExpress();

  return <ExpressContext.Provider value={{ ...uE }}>{children}</ExpressContext.Provider>;
};

export const useExpressContext = (): ExpressContextValues => {
  const context = React.useContext(ExpressContext);

  return context;
};
