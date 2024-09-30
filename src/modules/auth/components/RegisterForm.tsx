'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

import { passwordClasses } from '@/modules/auth/constants/password';
import { Button } from '@/modules/common/ui/components/button';
import { Checkbox } from '@/modules/common/ui/components/checkbox';
import HintText from '@/modules/common/ui/components/hintText';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { cn } from '@/modules/common/ui/lib/utils';

const RegisterForm = () => {
  const [passwordTest, setPasswordTest] = useState<zxcvbn.ZXCVBNResult>();
  const t = useTranslations('Register');
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email(t('emailError')).required(t('emailRequired')),
      password: Yup.string()
        .required(t('passwordRequired'))
        .min(8, t('passwordMinLength')),
    }),
    onSubmit: () => {},
  });

  useEffect(() => {
    setPasswordTest(zxcvbn(values.password, [values.email, 'Satoshi']));
  }, [values.password]);

  return (
    <form autoComplete='off' className='flex flex-col space-y-2' onSubmit={handleSubmit}>
      <span>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input
          type='email'
          id='email'
          name='email'
          placeholder={t('emailPlaceholder')}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <HintText variant='error'>{errors.email}</HintText>
        )}
      </span>
      <span>
        <Label htmlFor='password'>{t('password')}</Label>
        <Input
          type='password'
          id='password'
          name='password'
          placeholder={t('passwordPlaceholder')}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='new-password'
        />
        <HintText
          className={cn([
            'opacity-0',
            touched.password &&
              (errors.password ?? passwordTest?.feedback.warning) &&
              'opacity-100',
          ])}
          variant='error'
        >
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing*/}
          {errors.password || passwordTest?.feedback.warning || '.'}
        </HintText>
        <div className='flex gap-2 items-center'>
          <p className='text-sm text-zinc-200'>{t('passwordStrengthLabel')}:</p>
          {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          <p
            className={cn(
              [passwordClasses[passwordTest?.score ?? 1]],
              values.password.length === 0 && 'text-zinc-200',
              'text-base font-bold',
            )}
          >
            {t(
              `passwordStrength${values.password.length > 0 ? (passwordTest?.score ?? '0') : 'None'}`,
            )}
          </p>
        </div>
      </span>
      <span className='flex items-center space-x-2 pt-6'>
        <Checkbox id='terms' />
        <Label htmlFor='terms' className='text-base'>
          Si acepto tilín
        </Label>
      </span>

      <span className='pt-2'>
        <Button
          size='lg'
          className='w-full'
          loading={isSubmitting}
          disabled={(passwordTest?.score ?? 0) < 2}
        >
          Register
        </Button>
      </span>
    </form>
  );
};

export default RegisterForm;
