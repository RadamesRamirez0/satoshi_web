import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { PasswordValidation } from '@/modules/auth/utils/validatePassword';
import BackgroundPopover from '@/modules/common/ui/components/backgroundPopover';
import { cn } from '@/modules/common/ui/lib/utils';

export interface PasswordValidatorProps {
  open: boolean;
  validations?: PasswordValidation;
}

const PasswordValidator: FC<PasswordValidatorProps> = ({ open, validations }) => {
  const t = useTranslations('Register');

  const values = {
    [t('length')]: validations?.length,
    [t('uppercase')]: validations?.mayus,
    [t('lowercase')]: validations?.minus,
    [t('specialChars')]: validations?.specialChars,
  };

  return (
    <BackgroundPopover open={open} className='flex flex-col space-y-2'>
      {Object.entries(values).map(([validation, isValid]) => (
        <span key={validation} className='flex gap-2 items-center relative'>
          <CheckIcon
            className={cn(
              'text-green-500 opacity-0 transition-opacity absolute',
              isValid && 'opacity-100',
            )}
          />
          <Cross2Icon
            className={cn(
              'text-red-500 opacity-0 transition-opacity',
              !isValid && 'opacity-100',
            )}
          />
          <p className={cn(isValid && 'text-green-500', 'transition-colors')}>
            {validation}
          </p>
        </span>
      ))}
    </BackgroundPopover>
  );
};

export default PasswordValidator;
