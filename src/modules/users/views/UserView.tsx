import React from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import DashboardVerificationSteps from '@/modules/users/components/DashboardVerificationSteps';
import UserMeAlias from '@/modules/users/components/UserMeAlias';
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
      <UserMeAlias
        initialAlias={user.data.alias}
        email={user.data.email}
        referal={user.data.referal_code}
        referalUses={user.data.available_invites}
      />
      <DashboardVerificationSteps />
    </div>
  );
};

export default UserView;
