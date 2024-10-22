import React from 'react';

import LoginView from '@/modules/auth/views/LoginView';

const LoginPage = ({
  searchParams,
}: {
  searchParams?: { redirectTo: string | undefined };
}) => {
  return <LoginView redirectTo={searchParams?.redirectTo} />;
};

export default LoginPage;
