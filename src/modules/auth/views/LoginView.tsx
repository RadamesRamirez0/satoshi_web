import React from 'react';

import LoginCard from '@/modules/auth/components/LoginCard';

const LoginView = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <div className='flex justify-center items-center h-full'>
      <LoginCard redirectTo={redirectTo} />
    </div>
  );
};

export default LoginView;
