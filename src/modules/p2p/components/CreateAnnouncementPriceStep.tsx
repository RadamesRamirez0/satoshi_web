import { FC } from 'react';

import { Separator } from '@/modules/common/ui/components/separator';
import AnnouncementCurrencies from '@/modules/p2p/components/AnnouncementCurrencies';
import AnnouncementPriceType from '@/modules/p2p/components/AnnouncementPriceType';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

export const CreateAnnouncementPriceStep: FC = () => {
  const { formik } = useCreateAnnouncementContext();

  return (
    <>
      <AnnouncementCurrencies />
      {formik.values.base?.id && formik.values.quote?.id && (
        <span>
          <Separator className='my-4' />
          <AnnouncementPriceType />
        </span>
      )}
    </>
  );
};
