'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';

interface ComboboxContextValues<T> {
  open: boolean;
  value: T;

  setOpen: (open: boolean) => void;
  onChange: (value: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ComboboxContext = createContext<ComboboxContextValues<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as ComboboxContextValues<any>,
);

export interface ComboboxProviderProps<T> extends PropsWithChildren {
  onChange: (value: T) => void;
  value?: T;
}

export function ComboboxProvider<T>({
  children,
  onChange,
  value,
}: ComboboxProviderProps<T>): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        value,
        setOpen,
        onChange,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}

export const ComboboxConsumer = ComboboxContext.Consumer;

export const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useCombobox must be used within a ComboboxProvider');
  }

  return context;
};
