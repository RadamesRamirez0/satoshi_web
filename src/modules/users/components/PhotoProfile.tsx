'use client';

import Image from 'next/image';
import React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { Skeleton } from '@/modules/common/ui/components/skeleton';
import { cn } from '@/modules/common/ui/lib/utils';
import usePhotoProfile from '@/modules/users/hooks/usePhotoProfile';

export interface PhotoProfileProps {
  userId?: string;
  className?: string;
}

const PhotoProfile = ({ userId, className }: PhotoProfileProps) => {
  const [photo, loadingPhoto] = usePhotoProfile(userId);

  if (loadingPhoto) {
    return <Skeleton className={cn('w-full h-full shrink-0 rounded-full', className)} />;
  }

  if (!photo) {
    return <FaRegCircleUser className={cn('w-full h-full shrink-0', className)} />;
  }

  return (
    <Image
      width={64}
      height={64}
      alt='Photo profile'
      src={photo}
      className={cn('w-full h-full rounded-full shrink-0', className)}
    />
  );
};

export default PhotoProfile;
