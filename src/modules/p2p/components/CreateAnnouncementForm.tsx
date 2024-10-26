'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Tabs as MainTabs,
  TabsContent as MainTabsContent,
  TabsList as MainTabsList,
  TabsTrigger as MainTabsTrigger,
} from '@/modules/common/ui/components/main-tabs';
import Steps from '@/modules/common/ui/components/steps';
import { AnnouncementNavigation } from '@/modules/p2p/components/AnnouncementNavigation';
import { CreateAnnouncementPaymentStep } from '@/modules/p2p/components/CreateAnnouncementPaymentStep';
import { CreateAnnouncementPriceStep } from '@/modules/p2p/components/CreateAnnouncementPriceStep';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

const CreateAnnouncementForm = () => {
  const t = useTranslations('CreateAnnouncement');

  const { formik, currentStep } = useCreateAnnouncementContext();

  return (
    <div className='space-y-6'>
      <Steps
        orientation='horizontal'
        steps={[
          { label: t('step1'), value: 'price' },
          { label: t('step2'), value: 'payment' },
          // { label: t('step3'), value: 'confirmation' },
        ]}
        currentStep={currentStep}
      />
      <form className='border rounded-lg overflow-hidden' onSubmit={formik.handleSubmit}>
        <MainTabs
          id='type'
          onValueChange={(v) => void formik.setFieldValue('type', v)}
          value={formik.values.type}
        >
          <MainTabsList className='flex  rounded-b-none'>
            <MainTabsTrigger className='flex-1 text-lg' value='buy'>
              {t('buy')}
            </MainTabsTrigger>
            <MainTabsTrigger className='flex-1 text-lg' value='sell'>
              {t('sell')}
            </MainTabsTrigger>
          </MainTabsList>
          <MainTabsContent
            value='buy'
            className='data-[state=active]:p-4 gap-4 flex flex-col data-[state=active]:m-0 rounded-b-lg'
          >
            {currentStep === 'price' && <CreateAnnouncementPriceStep />}
            {currentStep === 'payment' && <CreateAnnouncementPaymentStep />}
          </MainTabsContent>
          <MainTabsContent
            value='sell'
            className='data-[state=active]:p-4 gap-4 flex flex-col data-[state=active]:m-0 rounded-b-lg'
          >
            {currentStep === 'price' && <CreateAnnouncementPriceStep />}
            {currentStep === 'payment' && <CreateAnnouncementPaymentStep />}
          </MainTabsContent>
        </MainTabs>

        <AnnouncementNavigation />
      </form>
    </div>
  );
};

export default CreateAnnouncementForm;
