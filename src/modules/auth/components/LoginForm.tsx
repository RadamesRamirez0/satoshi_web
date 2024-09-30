'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import * as Yup from 'yup';

import LoginForgotPassword from '@/modules/auth/components/LoginForgotPassword';
import { Button } from '@/modules/common/ui/components/button';
import HintText from '@/modules/common/ui/components/hintText';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';

const LoginForm = () => {
  const t = useTranslations('Login');
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
      password: Yup.string().required(t('passwordRequired')),
    }),
    onSubmit: () => {},
  });

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
          error={(errors.email?.length ?? 0) > 0}
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
          error={!!errors.password}
        />
        {touched.password && errors.password && (
          <HintText variant='error'>{errors.password}</HintText>
        )}
      </span>
      <LoginForgotPassword />
      <span className='pt-6'>
        <Button size='lg' className='w-full' loading={isSubmitting}>
          {t('mainAction')}
        </Button>
      </span>
    </form>
  );
};

export default LoginForm;
