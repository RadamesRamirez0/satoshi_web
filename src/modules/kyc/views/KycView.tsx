'use client';

import SumsubWebSdk from '@sumsub/websdk-react';
import React from 'react';

import { useRouter } from '@/modules/common/i18n/routing';
import KycPlaceholder from '@/modules/kyc/components/KycPlaceholder';
import { useKyc } from '@/modules/kyc/hooks/useKyc';

export const KycView = () => {
  const { token, loadingToken, error, getToken } = useKyc();
  const navigate = useRouter();

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
      onMessage={(type, payload) => {
        console.log(type, payload);
        if (
          type === 'idCheck.onApplicantSubmitted' ||
          type === 'idCheck.onApplicantReviewComplete' ||
          ('reviewStatus' in payload && payload.reviewStatus === 'completed')
        ) {
          navigate.replace('/users/me');
        }
      }}
      // options={}
      // onMessage={messageHandler}
      // onError={errorHandler}
    />
  );
};
