'use client';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { object, string } from 'yup';

import { authRepository } from '@/modules/auth/repository';
import { Link, useRouter } from '@/modules/common/i18n/routing';
import { Button, buttonVariants } from '@/modules/common/ui/components/button';
import { Card, CardContent, CardHeader } from '@/modules/common/ui/components/card';
import HintText from '@/modules/common/ui/components/hintText';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { cn } from '@/modules/common/ui/lib/utils';
import { toast } from '@/modules/common/utils/toast';

const ForgotPasswordView = () => {
  const t = useTranslations('ForgotPassword');
  const router = useRouter();

  const formik = useFormik({
    validationSchema: object({
      email: string().email().required(t('emailRequired')),
    }),
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      const res = await authRepository.forgotPassword({
        body: { email_address: values.email },
      });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (res.data?.email_sent) {
        router.push('/auth/forgot-password/sent');

        return;
      }

      toast.error("Couldn't send email");
    },
  });

  return (
    <div className='flex justify-center items-center h-full'>
      <Card className='w-[25rem]'>
        <CardHeader className='space-y-8'>
          <span className='flex gap-3 items-center'>
            <Link
              href='/auth/login'
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'px-0 py-0 p-1.5 h-auto border-none',
              )}
            >
              <ChevronLeftIcon className='size-4' />
            </Link>
            <h1 className='text-xl font-black'>{t('title')}</h1>
          </span>
          <p className='text-lg'>{t('description')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Label>{t('email')}</Label>
            <Input
              name='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              placeholder={t('emailPlaceholder')}
            />
            {formik.touched.email && formik.errors.email && (
              <HintText variant='error'>{t('emailError')}</HintText>
            )}
            <Button type='submit' size='lg' className='w-full mt-8'>
              {t('mainAction')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordView;
