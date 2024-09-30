import React, { FC, PropsWithChildren } from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { cn } from '@/modules/common/ui/lib/utils';

interface DashboardCardProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  className?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  containerClassName,
  children,
  className,
  ...props
}) => {
  return (
    <Card className={cn('border w-auto', containerClassName)} {...props}>
      <CardContent className={cn('h-full', className)}>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
