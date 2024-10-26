import React from 'react';

import HintText from '@/modules/common/ui/components/hintText';
import { Label } from '@/modules/common/ui/components/label';
import { NumericInput } from '@/modules/common/ui/components/numericInput';
import { cn } from '@/modules/common/ui/lib/utils';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

const AnnouncementAmmount = () => {
  const { formik } = useCreateAnnouncementContext();

  const { amount, base, quote } = formik.values;

  return (
    <div className='space-y-6 pb-4'>
      <span className='flex flex-col'>
        <Label className='text-lg' htmlFor='amount'>
          Total Amount
        </Label>
        <NumericInput
          id='amount'
          placeholder='Enter the amount'
          className='w-full  md:w-[28rem]'
          value={amount}
          onValueChange={(v) => void formik.setFieldValue('amount', v.value)}
          decimals={8}
          trailingText={base?.symbol.toUpperCase()}
          onBlur={formik.handleBlur}
        />
        <HintText
          variant='error'
          className={cn(
            'opacity-0',
            formik.touched.amount && amount.length === 0 && 'opacity-100',
          )}
        >
          {formik.errors.amount ?? '.'}
        </HintText>
      </span>
      <div>
        <Label className='text-lg'>Order Limit</Label>
        <span className='flex flex-col md:flex-row items-center mt-2 md:gap-4'>
          <span className='relative w-full md:w-auto'>
            <Label className='text-base text-whiteBG/80' htmlFor='minimum_order_size'>
              Minimum size
            </Label>
            <NumericInput
              id='minimum_order_size'
              onBlur={formik.handleBlur}
              placeholder='Enter the amount'
              className='w-full md:w-[12.5rem]'
              value={formik.values.minimum_order_size}
              onValueChange={(v) =>
                void formik.setFieldValue('minimum_order_size', v.value)
              }
              decimals={2}
              trailingText={quote?.symbol.toUpperCase()}
            />
            <HintText
              variant='error'
              className={cn(
                'absolute w-[14rem] left-0',
                'opacity-0',
                formik.touched.minimum_order_size &&
                  formik.values.minimum_order_size.length === 0 &&
                  'opacity-100',
              )}
            >
              {formik.errors.minimum_order_size ?? '.'}
            </HintText>
          </span>
          <p className='text-2xl font-bold pt-4 hidden md:flex'>~</p>
          <span className='relative w-full md:auto'>
            <Label className='text-base text-whiteBG/80' htmlFor='maximum_order_size'>
              Maximum size
            </Label>
            <NumericInput
              id='maximum_order_size'
              onBlur={formik.handleBlur}
              placeholder='Enter the amount'
              className='md:w-[12.5rem]'
              value={formik.values.maximum_order_size}
              onValueChange={(v) =>
                void formik.setFieldValue('maximum_order_size', v.value)
              }
              decimals={2}
              trailingText={quote?.symbol.toUpperCase()}
            />
            <HintText
              variant='error'
              className={cn(
                'absolute w-[16rem] left-0',
                'opacity-0',
                formik.touched.maximum_order_size &&
                  formik.values.maximum_order_size.length === 0 &&
                  'opacity-100',
              )}
            >
              {formik.errors.maximum_order_size ?? '.'}
            </HintText>
          </span>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementAmmount;
