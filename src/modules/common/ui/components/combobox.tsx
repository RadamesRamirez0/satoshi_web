'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { PopoverContentProps } from '@radix-ui/react-popover';
import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { Button, ButtonProps } from '@/modules/common/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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

interface ComboboxProps<T> extends PropsWithChildren {
  emptyValue?: string;
  dropDownClassName?: string;
  triggerClassName?: string;
  onChange: (value: T) => void;
  value?: T;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  searcher?: boolean;
  searcherPlaceholder?: string;
  id: string;
  align?: PopoverContentProps['align'];
  dropdownAsTriggerWidth?: boolean;
  label?: string;
  defaultLabel?: string;
  loading?: boolean;
  onBlur?: React.FocusEventHandler<HTMLButtonElement> | undefined;
}

function Combobox<T>({
  children,
  emptyValue,
  dropDownClassName,
  triggerClassName,
  onChange,
  align = 'start',
  value,
  dropdownAsTriggerWidth = false,
  searcher,
  searcherPlaceholder,
  id,
  label,
  loading,
  defaultLabel,
  variant = 'ghost',
  size = 'sm',
  onBlur,
}: ComboboxProps<T>): JSX.Element {
  const t = useTranslations('Combobox');

  return (
    <ComboboxProvider {...{ onChange, value }}>
      <ComboboxConsumer>
        {({ open, setOpen }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id={id}
                variant={variant}
                role='combobox'
                aria-expanded={open}
                className={cn(
                  'justify-between text-gray-400 text-base font-medium group h-[2.875rem]',
                  label && 'text-whiteBG/90 hover:text-whiteBG',
                  triggerClassName,
                )}
                size={size}
                onBlur={onBlur}
              >
                <div
                  className={cn('flex items-center gap-2 text-ellipsis overflow-hidden')}
                >
                  {loading ? (
                    <CgSpinner className='animate-spin  text-zinc-900 size-5' />
                  ) : (
                    (label ?? defaultLabel)
                  )}
                </div>
                <ChevronDownIcon className='size-5 ml-2 text-whiteBG/80 group-hover:text-whiteBG transition-colors' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align={align}
              className={cn(
                'p-0',
                'border border-zinc-700',
                dropdownAsTriggerWidth && 'w-popover-trigger max-h-popover-content',
              )}
            >
              <Command>
                {searcher && <CommandInput placeholder={searcherPlaceholder} />}
                <CommandList className={cn('max-h-80', dropDownClassName)}>
                  <CommandEmpty>{emptyValue ?? t('noResults')}</CommandEmpty>
                  <CommandGroup>{children}</CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </ComboboxConsumer>
    </ComboboxProvider>
  );
}

export { Combobox };
export type { ComboboxProps };
