import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

export const AnnouncementNavigation: FC = () => {
  const t = useTranslations('CreateAnnouncement');
  const { handleNextStep, handlePreviousStep, currentStep, formik } =
    useCreateAnnouncementContext();

  const errorsPrice =
    !!formik.errors.price ||
    !!formik.errors.base ||
    !!formik.errors.quote ||
    !formik.values.base ||
    !formik.values.quote;

  const errorsPayment =
    !!formik.errors.amount ||
    !!formik.errors.maximum_order_size ||
    !!formik.errors.minimum_order_size ||
    !formik.values.payment_method?.id;

  return (
    <div className='fixed bg-background bottom-0 left-0 h-20 border-t w-full flex items-center justify-end px-8 space-x-4'>
      {currentStep !== 'price' && (
        <Button
          type='button'
          size='lg'
          variant='outline'
          onClick={() => handlePreviousStep()}
        >
          <ChevronLeftIcon className='size-5 mr-2' />
          {t('previous')}
        </Button>
      )}

      {currentStep === 'price' && (
        <Button
          type='button'
          size='lg'
          onClick={() => handleNextStep()}
          disabled={errorsPrice}
        >
          {t('next')}
          <ChevronRightIcon className='size-5 ml-2' />
        </Button>
      )}
      {currentStep === 'payment' && (
        <Button
          type='submit'
          size='lg'
          disabled={errorsPayment}
          loading={formik.isSubmitting}
        >
          {t('create')}
        </Button>
      )}
    </div>
  );
};
