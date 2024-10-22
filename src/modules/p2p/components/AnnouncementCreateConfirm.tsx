import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/common/ui/components/alert-dialog';

export interface AnnouncementCreateConfirmProps {
  onConfirm: () => void;
}

const AnnouncementCreateConfirm = ({ onConfirm }: AnnouncementCreateConfirmProps) => {
  const t = useTranslations('CreateAnnouncement');
  const actions = useTranslations('actions');

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('confirmation')}</AlertDialogTitle>
        <AlertDialogDescription>{t('confirmationDescription')}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{actions('cancel')}</AlertDialogCancel>
        <AlertDialogAction onClick={() => onConfirm()}>
          {actions('confirm')}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AnnouncementCreateConfirm;
