import { getTranslations } from 'next-intl/server';
import React from 'react';

import { QueryClientWrap } from '@/modules/common/shared-ui/components/QueryClientWrap';
import { Button } from '@/modules/common/ui/components/button';
import AdvantagesSection from '@/modules/express/components/AdvantagesSection';
import { P2PTable } from '@/modules/p2p/components/P2PTable';

export interface Order {
  advertiser: string;
  price: string;
  available: string;
  payment: string;
}

const P2PView = async () => {
  const t = await getTranslations('P2PView');

  return (
    <div>
      <div className='flex justify-end w-full '>
        <Button>{t('newAnnouncement')}</Button>
      </div>
      <QueryClientWrap>
        <P2PTable />
      </QueryClientWrap>
      <AdvantagesSection />
    </div>
  );
};

export default P2PView;
