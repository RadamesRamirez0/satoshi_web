import React from 'react';

import RegisterCard from '@/modules/auth/components/RegisterCard';

const RegisterView = () => {
  return (
    <div className='relative min-h-screen flex justify-center items-center overflow-hidden'>
      {/* Full viewport background gradient */}
      <div className='fixed inset-0 -z-10 pointer-events-none'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-primary/8 to-transparent rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-500/12 via-primary/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-l from-purple-500/8 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      <div className='relative z-10 w-full max-w-md mx-4'>
        <RegisterCard />
      </div>
    </div>
  );
};

export default RegisterView;
