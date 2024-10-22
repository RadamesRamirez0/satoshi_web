import { FC } from 'react';

import { Separator } from '@/modules/common/ui/components/separator';
import AnnouncementAmmount from '@/modules/p2p/components/AnnouncementAmmount';
import AnnouncementPayment from '@/modules/p2p/components/AnnouncementPayment';

export const CreateAnnouncementPaymentStep: FC = () => {
  return (
    <>
      <AnnouncementAmmount />
      <span>
        <Separator className='my-4' />
        <AnnouncementPayment />
      </span>
    </>
  );
};
