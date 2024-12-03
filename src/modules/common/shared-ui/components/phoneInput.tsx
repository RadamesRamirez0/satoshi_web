import React, { useEffect, useState } from 'react';
import Input, { PhoneInputProps } from 'react-phone-input-2';

import '@/modules/common/shared-ui/styles/phoneInput.css';

import { inputVariants } from '@/modules/common/ui/components/input';
import { cn } from '@/modules/common/ui/lib/utils';

const PhoneInput = ({
  enableAreaCodes = true,
  ...props
}: Omit<
  PhoneInputProps,
  'inputClass' | 'dropdownClass' | 'containerClass' | 'preferredCountries'
>) => {
  const [inputClass, setInputClass] = useState('');

  useEffect(() => {
    const variants = inputVariants();
    const splitted = variants.split(' ');

    const classes = splitted
      .map((cls) => {
        if (cls === ' ') {
          return cls;
        }

        if (cls.includes(':')) {
          const a = cls.split(':');

          return `${a[0]}:!${a[1]}`;
        }

        return `!${cls}`;
      })
      .join(' ');

    setInputClass(classes);
  }, []);

  return (
    <Input
      inputClass={cn(
        inputClass,
        '!font-satoshi !text-whiteBG !py-2.5 !border-zinc-700 hover:!border-primary !bg-transparent',
      )}
      dropdownClass='!bg-background !text-popover-foreground !hover:bg-red-500 hover:[&>li]:!bg-white/10 !font-satoshi'
      containerClass='focus-visible:!outline-none'
      preferredCountries={['mx', 'us']}
      country='mx'
      enableAreaCodes={enableAreaCodes}
      {...props}
    ></Input>
  );
};

export default PhoneInput;
