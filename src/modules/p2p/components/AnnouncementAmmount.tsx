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
      <span>
        <Label className='text-lg'>Total Amount</Label>
        <NumericInput
          id='amount'
          placeholder='Enter the amount'
          className='w-[28rem]'
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
        <span className='flex items-center mt-2 gap-4'>
          <span className='relative'>
            <Label className='text-base text-whiteBG/80'>Minimum size</Label>
            <NumericInput
              id='minimum_order_size'
              onBlur={formik.handleBlur}
              placeholder='Enter the amount'
              className='w-[12.5rem]'
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
          <p className='text-2xl font-bold pt-4'>~</p>
          <span className='relative '>
            <Label className='text-base text-whiteBG/80'>Maximum size</Label>
            <NumericInput
              id='maximum_order_size'
              onBlur={formik.handleBlur}
              placeholder='Enter the amount'
              className='w-[12.5rem]'
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
