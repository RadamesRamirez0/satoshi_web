import { useEffect, useState } from 'react';

import { baseImage } from '@/modules/common/constants/env';

const usePhotoProfile = (userId: string): string | undefined => {
  const [photo, setPhoto] = useState<string>();

  const checkIfExistsPhoto = async () => {
    const url = `${baseImage}${userId}/profile_picture.jpg`;
    const res = await fetch(url);

    if (res.ok) {
      setPhoto(url);
    }
  };

  useEffect(() => {
    void checkIfExistsPhoto();
  }, [userId]);

  return photo;
};

export default usePhotoProfile;
