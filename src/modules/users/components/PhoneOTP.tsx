'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Link } from '@/modules/common/i18n/routing';
import PhoneInput from '@/modules/common/shared-ui/components/phoneInput';
import { Button } from '@/modules/common/ui/components/button';
import { CardContent, CardFooter, CardHeader } from '@/modules/common/ui/components/card';
import { DialogContent } from '@/modules/common/ui/components/dialog';
import { Label } from '@/modules/common/ui/components/label';

export interface PhoneOTPProps {
  onRegister?: boolean;
}

const PhoneOTP = ({ onRegister = false }: PhoneOTPProps) => {
  const t = useTranslations('PhoneOTP');
  const [phone, setPhone] = useState('');
  const [otpSended, setOtpSended] = useState(false);

  const sendOtp = () => {};

  return (
    <DialogContent>
      <CardHeader className='flex flex-col'>
        <h1 className='text-3xl font-semibold'>{t('title')}</h1>
        <p>{t('description')}</p>
      </CardHeader>
      {!otpSended && (
        <CardContent className='pt-2'>
          <Label>{t('phoneLabel')}</Label>
          <PhoneInput value={phone} onChange={(value) => setPhone(value)} />
          <Button className='mt-3'>{t('sendAction')}</Button>
        </CardContent>
      )}
      {otpSended && <CardContent></CardContent>}
      {onRegister && (
        <CardFooter className='flex-col items-start'>
          <div>
            <Link
              href='/auth/login'
              className='text-primary/80 hover:text-primary text-sm font-semibold transition-colors'
            >
              {t('skipLabel')}
            </Link>
          </div>
        </CardFooter>
      )}
    </DialogContent>
  );
};

export default PhoneOTP;
