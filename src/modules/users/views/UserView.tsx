import React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { getSession } from '@/app/api/auth/sessionAction';
import DashboardVerificationSteps from '@/modules/users/components/DashboardVerificationSteps';
import { usersRepository } from '@/modules/users/repository';

const UserView = async () => {
  const session = await getSession();

  const user = await usersRepository.userMe({
    token: session?.token ?? '',
  });

  if (user.error || !user.data) {
    return <></>;
  }

  return (
    <div className='py-8 px-12 space-y-12'>
      <div className='flex items-start gap-4'>
        <FaRegCircleUser className='size-12' />
        <span className='flex items-end gap-2.5'>
          <p className='text-2xl font-bold'>{user.data.email}</p>
        </span>
      </div>
      <DashboardVerificationSteps />
    </div>
  );
};

export default UserView;
