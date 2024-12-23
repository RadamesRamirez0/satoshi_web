'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
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
import { Link } from '@/modules/common/i18n/routing';
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
    setFieldValue,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: { email: '', password: '', tos: false, invitationCode: '' },
    validationSchema: Yup.object({
      email: Yup.string().email(t('emailError')).required(t('emailRequired')),
      password: Yup.string()
        .required(t('passwordRequired'))
        .min(8, t('passwordMinLength')),
      tos: Yup.boolean().oneOf([true], t('tosRequired')),
      invitationCode: Yup.string().required(t('invitationRequired')),
    }),
    onSubmit: async ({ email, password, invitationCode }) => {
      const res = await register({
        email,
        password,
        partner_id: partnerId,
        invitation_code: invitationCode,
      });

      if (res.error) {
        toast.error(res.error);

        return;
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
    <>
      <form
        autoComplete='off'
        className='flex flex-col space-y-2'
        onSubmit={handleSubmit}
      >
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
        <span>
          <Label htmlFor='invitationCode'>{t('invitation')}</Label>
          <Input
            type='text'
            id='invitationCode'
            name='invitationCode'
            placeholder={t('invitationPlaceholder')}
            value={values.invitationCode}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete='off'
          />
          {touched.invitationCode && errors.invitationCode && (
            <HintText variant='error'>{errors.invitationCode}</HintText>
          )}
        </span>
        <span>
          <span className='flex items-center space-x-2 '>
            <Checkbox
              id='tos'
              checked={values.tos}
              onCheckedChange={(v) => void setFieldValue('tos', v)}
              type='button'
              name='tos'
            />
            <span>
              <Label htmlFor='tos' className='text-sm flex items-center gap-0'>
                {t('terms1')}
                <Button asChild variant='link' className='p-0 ml-1'>
                  <Link href='/terminos-y-condiciones'>{t('terms2')}</Link>
                </Button>
              </Label>
            </span>
            {touched.tos && errors.tos && (
              <HintText variant='error'>{errors.tos}</HintText>
            )}
          </span>
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
            {t('mainAction')}
          </Button>
        </span>
      </form>
    </>
  );
};

export default RegisterForm;
