'use client';

import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

interface ComboboxContextValues {
  open: boolean;
  value: string;

  subLabel: string;
  setOpen: (open: boolean) => void;
  onChange: (value: string) => void;

  setSubLabel: (subLabel: string) => void;
}

export const ComboboxContext = createContext<ComboboxContextValues>(
  {} as ComboboxContextValues,
);

export interface ComboboxProviderProps extends PropsWithChildren {
  onChange: (value: string) => void;
  value: string;
}

export const ComboboxProvider: FC<ComboboxProviderProps> = ({
  children,
  onChange,
  value,
}) => {
  const [open, setOpen] = useState(false);

  const [subLabel, setSubLabel] = useState('');

  useEffect(() => {
    onChange(value);

    return;
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        value,
        setOpen,
        onChange,

        subLabel,
        setSubLabel,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
};

export const ComboboxConsumer = ComboboxContext.Consumer;

export const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useCombobox must be used within a ComboboxProvider');
  }

  return context;
};
