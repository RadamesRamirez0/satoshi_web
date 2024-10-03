'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { FC, PropsWithChildren } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/modules/common/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/common/ui/components/popover';
import {
  ComboboxConsumer,
  ComboboxProvider,
} from '@/modules/common/ui/context/ComboboxContext';
import { cn } from '@/modules/common/ui/lib/utils';

interface ComboboxProps extends PropsWithChildren {
  emptyValue?: string;
  dropDownClassName?: string;
  triggerClassName?: string;
  onChange: (value: string) => void;
  value: string;
  size?: 'sm' | 'lg';
  small: boolean;
}

const Combobox: FC<ComboboxProps> = ({
  children,
  emptyValue,
  dropDownClassName,
  triggerClassName,
  onChange,
  value,
  small,
  size = 'sm',
}) => {
  return (
    <ComboboxProvider {...{ onChange, value }}>
      <ComboboxConsumer>
        {({ open, setOpen, value, subLabel }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                role='combobox'
                aria-expanded={open}
                className={cn(
                  ' justify-between text-gray-400 text-base font-medium group',
                  size === 'sm' && 'px-3 py-2',
                  size === 'lg' && 'px-6 py-4',
                  value && 'text-whiteBG/80 hover:text-whiteBG',
                  triggerClassName,
                )}
              >
                <div className='flex items-center gap-2 text-ellipsis overflow-hidden'>
                  {value.toUpperCase()}
                  {subLabel && !small && <p className='text-gray-500'>{subLabel}</p>}
                </div>
                <ChevronDownIcon className='size-5 ml-2 text-whiteBG/80 group-hover:text-whiteBG transition-colors' />
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' alignOffset={-18} className='p-0 w-[22rem]'>
              <Command>
                <CommandList className={cn('max-h-80', dropDownClassName)}>
                  <CommandEmpty>{emptyValue ?? 'No elements.'}</CommandEmpty>
                  <CommandGroup>{children}</CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </ComboboxConsumer>
    </ComboboxProvider>
  );
};

export { Combobox };
export type { ComboboxProps };
