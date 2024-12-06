import React from 'react';

import { getSession } from '@/app/api/auth/sessionAction';
import { QueryClientWrap } from '@/modules/common/shared-ui/components/QueryClientWrap';
import MyAnnouncementsTable from '@/modules/p2p/components/MyAnnouncementsTable';

const MyAnnouncementsView = async () => {
  const session = await getSession();

  if (!session) {
    return;
  }

  return (
    <div>
      <QueryClientWrap>
        <MyAnnouncementsTable session={session} />
      </QueryClientWrap>
    </div>
  );
};

export default MyAnnouncementsView;
