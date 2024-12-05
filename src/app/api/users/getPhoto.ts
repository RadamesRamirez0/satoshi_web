'use server';

import { baseImage } from '@/modules/common/constants/env';

export const getPhoto = async (userId: string): Promise<string | undefined> => {
  const url = `${baseImage}${userId}/profile_picture.jpg`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return undefined;
    }

    return url;
  } catch {
    return undefined;
  }
};
