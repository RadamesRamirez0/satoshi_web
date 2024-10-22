'use client';

import React from 'react';

import { AnnouncementNavigation } from '@/modules/p2p/components/AnnouncementNavigation';
import CreateAnnouncementForm from '@/modules/p2p/components/CreateAnnouncementForm';
import { CreateAnnouncementProvider } from '@/modules/p2p/contexts/CreateAnnouncementContext';

const CreateAnnouncementView = () => {
  return (
    <div className='pb-24'>
      <CreateAnnouncementProvider>
        <CreateAnnouncementForm />
        <AnnouncementNavigation />
      </CreateAnnouncementProvider>
    </div>
  );
};

export default CreateAnnouncementView;
