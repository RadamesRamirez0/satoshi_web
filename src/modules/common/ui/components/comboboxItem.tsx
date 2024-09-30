'use client';

import { CheckIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';
import React from 'react';

import { useComboboxContext } from '@/modules/common/ui/context/ComboboxContext';
import { cn } from '@/modules/common/ui/lib/utils';

interface ComboboxItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  subLabel?: string;
}

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  ComboboxItemProps
>(({ className, children, subLabel, ...props }, ref) => {
  const { value, setValue, setOpen, setLabel, setSubLabel } = useComboboxContext();

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'flex group items-center bg-zinc-700 cursor-default select-none justify-start  px-5 py-2 text-sm outline-none h-14 hover:bg-primary transition-colors  [&_[data-slot=sublabel]]:hover:text-primary-200 [&_[data-slot=label]]:hover:text-black [&_[data-slot=label]]:hover:transition-colors',
        className,
      )}
      onSelect={(currentValue) => {
        setOpen(false);
        if (!props.value) {
          setValue(children as string);

          return;
        }

        setValue(value === currentValue ? '' : currentValue);
        setLabel(value === currentValue ? '' : (children as string));
        setSubLabel(value === currentValue ? '' : (subLabel ?? ''));
      }}
      {...props}
    >
      <div className='flex flex-col w-[calc(100%-30px)] '>
        <p
          className='inline-block  text-whiteBG group-hover:text-black  text-base font-bold text-ellipsis  text-nowrap overflow-hidden'
          data-slot='label'
        >
          {children}
        </p>
        <p
          className='text-gray-300 group-hover:text-gray-800 text-xs font-medium'
          data-slot='sublabel'
        >
          {subLabel}
        </p>
      </div>
      <CheckIcon
        className={cn(
          'ml-auto size-5 text-primary-500',
          value === props.value ? 'opacity-100' : 'opacity-0',
        )}
      />
    </CommandPrimitive.Item>
  );
});

ComboboxItem.displayName = 'ComboboxItem';

export { ComboboxItem };
export type { ComboboxItemProps };
