import React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { getSession } from '@/app/api/auth/lib/session';
import DashboardVerificationSteps from '@/modules/users/components/DashboardVerificationSteps';

const UserView = () => {
  console.log(getSession());

  return (
    <div className='py-8 px-12 space-y-12'>
      <div className='flex items-start gap-4'>
        <FaRegCircleUser className='size-12' />
        <span className='flex items-end gap-2.5'>
          <p className='text-2xl font-bold'>Radames Ramírez</p>
          <p className='text-sm font-semibold pb-0.5'>radameskalel@gmail.com</p>
        </span>
      </div>
      <DashboardVerificationSteps />
    </div>
  );
};

export default UserView;
