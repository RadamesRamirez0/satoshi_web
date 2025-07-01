import React from 'react';

import LoginCard from '@/modules/auth/components/LoginCard';

const LoginView = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <div className='relative min-h-screen flex justify-center items-center overflow-hidden'>
      {/* Full viewport background gradient */}
      <div className='fixed inset-0 -z-10 pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 via-emerald-500/8 to-transparent rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/12 via-primary/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/8 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      <div className='relative z-10 w-full max-w-md mx-4'>
        <LoginCard redirectTo={redirectTo} />
      </div>
    </div>
  );
};

export default LoginView;
