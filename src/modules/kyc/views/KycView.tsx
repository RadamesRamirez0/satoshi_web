'use client';

import SumsubWebSdk from '@sumsub/websdk-react';
import React from 'react';

import KycPlaceholder from '@/modules/kyc/components/KycPlaceholder';
import { useKyc } from '@/modules/kyc/hooks/useKyc';

export const KycView = () => {
  const { token, loadingToken, error, getToken } = useKyc();

  if (!token || loadingToken) {
    return <KycPlaceholder />;
  }

  if (error) {
    return <div>An error ocurred</div>;
  }

  return (
    <SumsubWebSdk
      accessToken={token}
      expirationHandler={getToken}
      // options={}
      // onMessage={messageHandler}
      // onError={errorHandler}
    />
  );
};
