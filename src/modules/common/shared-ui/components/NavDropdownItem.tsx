import React, { FC } from 'react';

import { Button, ButtonProps } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';

const NavDropdownItem: FC<ButtonProps> = ({
  className,
  size = 'md',
  variant = 'ghost',
  ...props
}) => {
  return (
    <Button
      className={cn('w-full gap-3 rounded-none justify-start px-6', className)}
      variant={variant}
      size={size}
      {...props}
    />
  );
};

export default NavDropdownItem;
