import { createContext, FC, PropsWithChildren, useContext } from 'react';

import {
  useCreateAnnouncement,
  UseCreateAnnouncementValues,
} from '@/modules/p2p/hooks/useCreateAnnouncement';

export type CreateAnnouncementContextType = UseCreateAnnouncementValues;

export const CreateAnnouncementContext = createContext<
  CreateAnnouncementContextType | undefined
>({} as CreateAnnouncementContextType);

export const CreateAnnouncementProvider: FC<PropsWithChildren> = ({ children }) => {
  const createAnnouncement = useCreateAnnouncement();

  return (
    <CreateAnnouncementContext.Provider value={createAnnouncement}>
      {children}
    </CreateAnnouncementContext.Provider>
  );
};

export const useCreateAnnouncementContext = (): CreateAnnouncementContextType => {
  const context = useContext(CreateAnnouncementContext);

  if (!context) {
    throw new Error(
      'useCreateAnnouncementContext must be used within a CreateAnnouncementProvider',
    );
  }

  return context;
};
