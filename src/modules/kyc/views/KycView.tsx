'use client';

import SumsubWebSdk from '@sumsub/websdk-react';
import React from 'react';

import KycPlaceholder from '@/modules/kyc/components/KycPlaceholder';
import { useKyc } from '@/modules/kyc/hooks/useKyc';

export const KycView = () => {
  const { token, loadingToken, error } = useKyc();

  if (loadingToken) {
    return <KycPlaceholder />;
  }

  if (!token) {
    return <div>Token not found</div>;
  }

  if (error) {
    return <div>An error ocurred</div>;
  }

  return (
    <SumsubWebSdk
      accessToken={token}
      expirationHandler={() => {}}
      config={{}}

      // options={}
      // onMessage={messageHandler}
      // onError={errorHandler}
    />
  );
};
