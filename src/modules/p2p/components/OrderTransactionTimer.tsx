'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';
import parseTsToDate from '@/modules/common/utils/parseTsToDate';

export interface OrderTransactionTimerProps {
  createdAt: string;
  timeToComplete: string;
  small?: boolean;
}

const OrderTransactionTimer = ({
  createdAt,
  timeToComplete,
  small = false,
}: OrderTransactionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<Date>(new Date(0));
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');

  const timeToCompleteDate = parseTsToDate(
    parseInt(timeToComplete, 10) + parseInt(createdAt, 10),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = timeToCompleteDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(new Date(0));
      } else {
        setTimeLeft(new Date(diff));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeToCompleteDate]);

  useEffect(() => {
    const min = timeLeft.getMinutes();
    if (min < 10) {
      setMinutes(`0${min}`);
    } else {
      setMinutes(`${min}`);
    }

    const sec = timeLeft.getSeconds();

    if (sec < 10) {
      setSeconds(`0${sec}`);
    } else {
      setSeconds(`${sec}`);
    }
  }, [timeLeft]);

  if (!minutes || !seconds) {
    return null;
  }

  return (
    <p
      className={cn('text-primary text-2xl font-bold', small && 'text-sm')}
    >{`${minutes}:${seconds}`}</p>
  );
};

export default OrderTransactionTimer;
