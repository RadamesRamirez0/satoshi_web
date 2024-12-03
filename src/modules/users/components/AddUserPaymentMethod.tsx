import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import { DialogContent, DialogTitle } from '@/modules/common/ui/components/dialog';
import { cn } from '@/modules/common/ui/lib/utils';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';
import { p2pRepository } from '@/modules/p2p/repository';
import AddUserPaymentForm from '@/modules/users/components/AddUserPaymentForm';

export interface AddUserPaymentMethodProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddUserPaymentMethod = ({ onClose, isOpen }: AddUserPaymentMethodProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const session = useSession();

  const t = useTranslations('AddUserPaymentMethod');

  useEffect(() => {
    if (!session?.token) {
      return;
    }

    void p2pRepository.paymentMethods({ token: session.token }).then((methods) => {
      if (methods.error || !methods.data) {
        return;
      }
      setPaymentMethods(methods.data);
    });
  }, [session?.token]);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    setSelectedMethod(undefined);
  }, [isOpen]);

  return (
    <>
      {!selectedMethod && (
        <DialogContent className='space-y-2' aria-describedby=''>
          <DialogTitle className='text-xl font-bold'>{t('title')}</DialogTitle>
          <p className='text-sm text-whiteBG/80'>{t('description')}</p>
          {paymentMethods
            ?.filter((m) => m.enable)
            .map((m) => (
              <Button
                onClick={() => setSelectedMethod(m)}
                variant='darkGhost'
                key={m.id}
                className={cn(
                  'flex justify-between border rounded-lg px-0 py-0  p-4 w-full h-min gap-2 text-whiteBG font-medium text-lg',
                )}
              >
                {m.name}
                <PlusIcon className='w-4 h-4 text-primary' />
              </Button>
            ))}
        </DialogContent>
      )}
      {selectedMethod && (
        <DialogContent className='scroll-y-auto space-y-4' aria-describedby=''>
          <DialogTitle className='text-xl font-bold'>{t('setPaymentMethod')}</DialogTitle>
          <span className='w-full rounded-xl gap-2 p-4 flex text-sm bg-yellow-300/20 items-start'>
            <InfoCircledIcon className='size-3 text-yellow-300 shrink-0' />
            {t('tip')}
          </span>

          <AddUserPaymentForm
            onCancel={() => setSelectedMethod(undefined)}
            postSubmit={onClose}
            requiredData={selectedMethod.required_data}
            idPaymentMethod={selectedMethod.id}
          />
        </DialogContent>
      )}
    </>
  );
};

export default AddUserPaymentMethod;
