import { useEffect, useState } from 'react';

import { getPhoto } from '@/app/api/users/getPhoto';
import { useSession } from '@/modules/auth/hooks/useSession';

const usePhotoProfile = (userId?: string): [string | undefined, boolean] => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const session = useSession();

  const checkIfExistsPhoto = async () => {
    setLoadingPhoto(true);
    if (!userId && !session?.user.id) {
      return;
    }

    try {
      const url = await getPhoto(userId ?? session?.user.id ?? '');

      if (!url) {
        return;
      }

      setPhoto(url);
    } catch {
      setPhoto(undefined);
    } finally {
      setLoadingPhoto(false);
    }
  };

  useEffect(() => {
    void checkIfExistsPhoto();
  }, [userId, session?.user.id]);

  return [photo, loadingPhoto];
};

export default usePhotoProfile;
