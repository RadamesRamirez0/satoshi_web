'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { VoidCallback } from '@/modules/common/types/voidCallback';
import { Button } from '@/modules/common/ui/components/button';
import { CardContent, CardHeader } from '@/modules/common/ui/components/card';
import { DialogContent } from '@/modules/common/ui/components/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/modules/common/ui/components/input-otp';
import { Label } from '@/modules/common/ui/components/label';
import { createTimer } from '@/modules/common/utils/createTimer';
import { toast } from '@/modules/common/utils/toast';
import { usersRepository } from '@/modules/users/repository';

export interface EmailOTPProps {
  postSubmit?: VoidCallback;
  isOpen: boolean;
}

const EmailOTP = ({ postSubmit, isOpen }: EmailOTPProps) => {
  const t = useTranslations('EmailOTP');
  const session = useSession();
  const [otpSended, setOtpSended] = useState(false);
  const [timesSended, setTimesSended] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [otpCode, setOtpCode] = useState<string>();

  const sendOtp = async () => {
    if (timesSended === 3) {
      return;
    }

    const res = await usersRepository.requestEmailOtp({
      body: { purpose: 'email_verification' },
      token: session?.token,
    });

    if ('error' in res) {
      toast.error(res.error);

      return;
    }

    if (!otpSended) {
      setOtpSended(true);
    }

    let timeToWait = 60;

    if (timesSended === 1) {
      timeToWait = 120;
    }
    if (timesSended === 2) {
      timeToWait = 240;
    }
    setTimeLeft(timeToWait);
    setTimesSended((prev) => prev + 1);
  };

  const submitOtp = async () => {
    if (!otpCode) {
      return;
    }

    const res = await usersRepository.confirmEmail({
      body: { purpose: 'email_verification', otp_code: otpCode },
      token: session?.token,
    });

    if (res.error) {
      toast.error(res.error);

      setOtpCode('');

      return;
    }

    if (res.data?.confirmed) {
      void postSubmit?.();
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (!isOpen || !session?.token) {
      return;
    }

    void sendOtp();
  }, [isOpen, session?.token]);

  return (
    <DialogContent>
      <CardHeader className='flex flex-col'>
        <DialogTitle>
          <h1 className='text-3xl font-semibold'>{t('title')}</h1>
        </DialogTitle>
        <p>{t('description')}</p>
      </CardHeader>

      <CardContent className='pt-2 space-y-2'>
        <Label>{t('otpLabel')}</Label>
        <InputOTP
          maxLength={6}
          value={otpCode}
          onChange={(v) => setOtpCode(v)}
          onComplete={() => submitOtp()}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          variant='link'
          disabled={timeLeft > 0}
          onClick={() => void sendOtp()}
        >{`${createTimer(timeLeft)} ${t('sendAgain')}`}</Button>
      </CardContent>
    </DialogContent>
  );
};

export default EmailOTP;
