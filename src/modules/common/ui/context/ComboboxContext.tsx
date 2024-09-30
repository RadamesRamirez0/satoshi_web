'use client';

import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

interface ComboboxContextValues {
  open: boolean;
  value: string;
  label: string;
  subLabel: string;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  setLabel: (label: string) => void;
  setSubLabel: (subLabel: string) => void;
}

export const ComboboxContext = createContext<ComboboxContextValues>(
  {} as ComboboxContextValues,
);

export interface ComboboxProviderProps extends PropsWithChildren {
  onChange?: (value: string) => void;
  defaultValue?: string;
  defaultLabel?: string;
}

export const ComboboxProvider: FC<ComboboxProviderProps> = ({
  children,
  onChange,
  defaultValue,
  defaultLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? '');
  const [label, setLabel] = useState(defaultLabel ?? '');
  const [subLabel, setSubLabel] = useState('');

  useEffect(() => {
    if (value && onChange) {
      onChange(value);

      return;
    }
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        value,
        setOpen,
        setValue,
        label,
        setLabel,
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
