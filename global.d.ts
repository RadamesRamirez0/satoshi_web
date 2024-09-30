import en from '@/modules/common/i18n/messages/en.json';

type Messages = typeof en;

declare global {
  type IntlMessages = Messages;
}
