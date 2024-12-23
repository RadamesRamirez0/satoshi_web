import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Badge } from '@/modules/common/ui/components/badge';
import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { Dialog, DialogTrigger } from '@/modules/common/ui/components/dialog';
import { Label } from '@/modules/common/ui/components/label';
import { cn } from '@/modules/common/ui/lib/utils';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';
import UserPaymentMethods from '@/modules/users/components/UserPaymentMethods';

const AnnouncementPayment = () => {
  const [selectPayment, setSelectPayment] = useState(false);
  const { formik } = useCreateAnnouncementContext();
  const t = useTranslations('CreateAnnouncement');

  return (
    <div className='space-y-3'>
      <span className='flex flex-col'>
        <Label className='text-lg mb-1'>{t('paymentMethod')}</Label>
        {!formik.values.payment_method?.id && (
          <Dialog open={selectPayment} onOpenChange={setSelectPayment}>
            <UserPaymentMethods
              modal
              onClose={() => setSelectPayment(false)}
              onSubmit={(p) => void formik.setFieldValue('payment_method', p)}
            />
            <DialogTrigger asChild>
              <Button className='w-min font-bold items-center'>
                <PlusIcon className='size-5  mr-2' />
                {t('addPaymentMethod')}
              </Button>
            </DialogTrigger>
          </Dialog>
        )}
        {formik.values.payment_method?.id && (
          <div
            className={cn(
              'flex flex-col items-start border rounded-lg px-0 py-0  p-4 w-full h-min gap-2',
            )}
          >
            <div className='w-full flex justify-between items-start'>
              <Badge className='text-sm' variant='secondary'>
                {capitalizeSnakedWords(formik.values.payment_method.payment_method_id)}
              </Badge>
              <Button
                variant='darkGhost'
                className='px-2 py-2 text-whiteBG/60'
                onClick={() => void formik.setFieldValue('payment_method', undefined)}
              >
                <Cross1Icon className='size-5' />
              </Button>
            </div>
            <div className='flex flex-col items-start w-full'>
              {Object.entries(formik.values.payment_method.payment_method_data).map(
                ([key, value]) => (
                  <div key={key} className='text-whiteBG flex items-center gap-2 '>
                    <p className='text-base font-medium text-whiteBG/60  text-start'>
                      {capitalizeSnakedWords(key)}:
                    </p>
                    <p className='text-base font-bold  text-start'>{value}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </span>
      <span className='flex flex-col relative'>
        <Label className='text-lg'>{t('paymentTimeLimit')}</Label>
        <Combobox
          align='start'
          id='base'
          onBlur={formik.handleBlur}
          onChange={(v) =>
            void formik.setFieldValue('maximum_time_for_transaction_completion', v)
          }
          value={formik.values.maximum_time_for_transaction_completion}
          triggerClassName='w-64'
          variant='outline'
          dropdownAsTriggerWidth
          size='input'
          defaultLabel='Select Time'
          label={`${formik.values.maximum_time_for_transaction_completion / 60} ${t('minutes')}`}
        >
          {[900, 1800, 2700, 3600].map((time) => (
            <ComboboxItem key={time} value={time}>
              {time / 60} {t('minutes')}
            </ComboboxItem>
          ))}
        </Combobox>
      </span>
    </div>
  );
};

export default AnnouncementPayment;
