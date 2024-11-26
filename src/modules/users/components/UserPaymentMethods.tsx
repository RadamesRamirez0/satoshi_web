import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Badge } from '@/modules/common/ui/components/badge';
import { Button } from '@/modules/common/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/modules/common/ui/components/dialog';
import { cn } from '@/modules/common/ui/lib/utils';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import AddUserPaymentMethod from '@/modules/users/components/AddUserPaymentMethod';
import {
  UserPaymentMethodsContext,
  UserPaymentMethodsProvider,
} from '@/modules/users/context/userPaymentMethodsContext';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';

export interface UserPaymentMethodsProps {
  modal?: boolean;
  onClose?: () => void;
  onSubmit?: (paymentMethod: UserPaymentMethod) => void;
}

const UserPaymentMethods: FC<UserPaymentMethodsProps> = ({
  modal,
  onClose,
  onSubmit,
}) => {
  const session = useSession();
  const Component = modal ? DialogContent : 'div';
  const t = useTranslations('UserPaymentMethods');
  const [openAdd, setOpenAdd] = useState(false);

  if (!session?.token) {
    return null;
  }

  return (
    <UserPaymentMethodsProvider>
      <UserPaymentMethodsContext.Consumer>
        {({ methods, fetchMethods }) => (
          <Component
            className={cn(!modal && 'border  p-4 rounded-lg')}
            aria-describedby=''
          >
            <DialogTitle className='text-xl font-bold'>{t('title')}</DialogTitle>
            <div className='mt-4 space-y-3'>
              {methods
                .filter((m) => m.enable)
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
                      'flex flex-col items-start border rounded-lg px-0 py-0  p-4 w-full h-min gap-2',
                      !onSubmit && 'pointer-events-none',
                    )}
                  >
                    <Badge className='text-sm' variant='secondary'>
                      {capitalizeSnakedWords(method.payment_method_id)}
                    </Badge>
                    <div className='flex flex-col items-start w-full'>
                      {Object.entries(method.payment_method_data).map(([key, value]) => (
                        <div key={key} className='text-whiteBG flex items-center gap-2 '>
                          <p className='text-base font-medium text-whiteBG/60  text-start'>
                            {capitalizeSnakedWords(key)}:
                          </p>
                          <p className='text-base font-bold  text-start'>{value}</p>
                        </div>
                      ))}
                    </div>
                  </Button>
                ))}
            </div>
            <div className='flex justify-end'>
              <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                <DialogTrigger asChild>
                  <Button className='mt-4 '>
                    <PlusIcon className='size-5 mr-2' />
                    {t('add')}
                  </Button>
                </DialogTrigger>
                <AddUserPaymentMethod
                  onClose={() => {
                    setOpenAdd(false);
                    void fetchMethods();
                  }}
                />
              </Dialog>
            </div>
          </Component>
        )}
      </UserPaymentMethodsContext.Consumer>
    </UserPaymentMethodsProvider>
  );
};

export default UserPaymentMethods;
