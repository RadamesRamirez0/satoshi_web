import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import { DialogContent } from '@/modules/common/ui/components/dialog';
import { cn } from '@/modules/common/ui/lib/utils';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { p2pRepository } from '@/modules/p2p/repository';

export interface SelectPaymentMethodProps {
  onClose?: () => void;
  onSubmit?: (paymentMethod: PaymentMethod) => void;
}

const SelectPaymentMethod = ({ onClose, onSubmit }: SelectPaymentMethodProps) => {
  const t = useTranslations('SelectPaymentMethod');
  const [methods, setMethods] = useState<PaymentMethod[]>();
  const { token } = useSession();

  useEffect(() => {
    if (!token) {
      return;
    }
    void p2pRepository.paymentMethods({ token }).then((methods) => {
      if (methods.error || !methods.data) {
        return;
      }
      setMethods(methods.data);
    });
  }, [token]);

  return (
    <DialogContent>
      <h2 className='text-xl font-bold'>{t('title')}</h2>
      <div className='mt-4 space-y-3'>
        {methods
          ?.filter((m) => m.enable)
          .map((method) => (
            <Button
              onClick={() => {
                if (!onSubmit) {
                  return;
                }

                onSubmit(method);
                onClose?.();
              }}
              variant='darkGhost'
              key={method.id}
              className={cn(
                'flex flex-col items-start border rounded-lg px-0 py-0  p-4 w-full h-min gap-2 text-whiteBG',
                !onSubmit && 'pointer-events-none',
              )}
            >
              {method.name}
            </Button>
          ))}
      </div>
      <div className='flex justify-end'></div>
    </DialogContent>
  );
};

export default SelectPaymentMethod;
