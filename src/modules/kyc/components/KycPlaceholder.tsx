import React from 'react';

import { Skeleton } from '@/modules/common/ui/components/skeleton';

const KycPlaceholder = () => {
  return (
    <div className='w-full flex justify-center items-center pt-20'>
      <Skeleton className='bg-zinc-800 w-[25rem] h-[30rem]' />
    </div>
  );
};

export default KycPlaceholder;
