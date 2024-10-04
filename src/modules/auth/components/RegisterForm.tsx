'use client';

import { useFormik } from 'formik';
// eslint-disable-next-line import/no-unresolved
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { register } from '@/app/api/auth/registerAction';
import PasswordValidator from '@/modules/auth/components/PasswordValidator';
import { partnerId } from '@/modules/auth/constants/env';
import {
  PasswordValidation,
  validatePassword,
} from '@/modules/auth/utils/validatePassword';
import { useRouter } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';
import { Checkbox } from '@/modules/common/ui/components/checkbox';
import HintText from '@/modules/common/ui/components/hintText';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { toast } from '@/modules/common/utils/toast';

export interface RegisterFormProps {
  redirectTo?: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ redirectTo }) => {
  const passRef = useRef<HTMLInputElement>(null);
  const [passFocused, setPassFocused] = useState<boolean>(false);
  const [validations, setValidations] = useState<PasswordValidation>();
  const t = useTranslations('Register');
  const router = useRouter();

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email(t('emailError')).required(t('emailRequired')),
      password: Yup.string()
        .required(t('passwordRequired'))
        .min(8, t('passwordMinLength')),
      tos: Yup.boolean().oneOf([true], t('tosRequired')),
    }),
    onSubmit: async ({ email, password }) => {
      const res = await register({ email, password, partner_id: partnerId });

      if (res.error) {
        toast.error(res.error);
      }

      router.push(redirectTo ?? '/');
    },
  });

  useEffect(() => {
    if (values.password !== '') {
      setTimeout(() => {
        passRef.current?.focus();
      }, 1);
    }
    setValidations(validatePassword(values.password));
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
          autoComplete='off'
        />
        {touched.email && errors.email && (
          <HintText variant='error'>{errors.email}</HintText>
        )}
      </span>
      <span className='relative'>
        <Label htmlFor='password'>{t('password')}</Label>

        <Input
          type='password'
          id='password'
          name='password'
          placeholder={t('passwordPlaceholder')}
          value={values.password}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            setPassFocused(false);
          }}
          autoComplete='current-password'
          ref={passRef}
          onFocus={() => setPassFocused(true)}
        />
        <PasswordValidator open={passFocused} validations={validations} />
      </span>
      <span className='flex items-center space-x-2 '>
        <Checkbox id='terms' />
        <Label htmlFor='terms' className='text-sm'>
          {t('terms')}
        </Label>
      </span>

      <span className='pt-2'>
        <Button
          size='lg'
          className='w-full'
          loading={isSubmitting}
          type='submit'
          disabled={
            Object.values(validations ?? { a: false })
              .map((v) => v)
              .includes(false) || !isValid
          }
        >
          Register
        </Button>
      </span>
    </form>
  );
};

export default RegisterForm;
