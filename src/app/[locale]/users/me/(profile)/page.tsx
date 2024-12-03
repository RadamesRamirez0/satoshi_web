import React from 'react';

import { withAuth } from '@/modules/auth/utils/withAuth';
import UserView from '@/modules/users/views/UserView';

const UserMePage = () => {
  return <UserView />;
};

export default withAuth(UserMePage);
