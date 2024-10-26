import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { object, string, StringSchema } from 'yup';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import HintText from '@/modules/common/ui/components/hintText';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { cn } from '@/modules/common/ui/lib/utils';
import { capitalizeSnakedWords } from '@/modules/common/utils/strings';
import { toast } from '@/modules/common/utils/toast';
import { usersRepository } from '@/modules/users/repository';

export interface AddUserPaymentFormProps {
  postSubmit: () => void;
  onCancel: () => void;
  requiredData: Record<string, string>;
  idPaymentMethod: string;
}

const AddUserPaymentForm = ({
  postSubmit,
  requiredData,
  idPaymentMethod,
}: AddUserPaymentFormProps) => {
  const t = useTranslations('AddUserPaymentMethod');

  const session = useSession();
  const initialValues = Object.keys(requiredData).reduce(
    (acc, key) => {
      acc[key] = '';

      return acc;
    },
    {} as Record<string, string>,
  );

  const formik = useFormik({
    initialValues,
    validationSchema: object({
      ...Object.keys(requiredData).reduce(
        (acc, key) => ({
          ...acc,
          [key]: string().required(t('requiredField')),
        }),
        {} as Record<string, StringSchema>,
      ),
    }),
    onSubmit: async (values) => {
      if (!session?.token) {
        return;
      }

      const res = await usersRepository.addPaymentMethod({
        token: session.token,
        body: { id_payment_method: idPaymentMethod, payment_method_data: values },
      });

      if (res.error) {
        toast.error(res.error);

        return;
      }

      postSubmit();
    },
  });

  return (
    <form className='mt-4  px-2' onSubmit={formik.handleSubmit}>
      {Object.entries(requiredData).map(([key, value]) => (
        <span key={value}>
          <Label>{capitalizeSnakedWords(key)}</Label>
          <Input
            type='text'
            id={key}
            value={formik.values[key]}
            onChange={formik.handleChange}
            name={key}
            onBlur={formik.handleBlur}
          />
          <HintText
            variant='error'
            className={cn(
              'opacity-0',
              formik.touched[key] && formik.values[key].length === 0 && 'opacity-100',
            )}
          >
            {formik.errors[key] ?? '.'}
          </HintText>
        </span>
      ))}
      <div className='justify-end w-full flex gap-3 mt-8'>
        <Button type='button' onClick={() => postSubmit()} variant='outline' size='md'>
          {t('cancel')}
        </Button>
        <Button
          type='submit'
          size='md'
          disabled={
            Object.keys(formik.errors).length > 0 ||
            Object.keys(formik.touched).length === 0
          }
        >
          {t('confirm')}
        </Button>
      </div>
    </form>
  );
};

export default AddUserPaymentForm;
