import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { LanguagesSupportedType } from '@/modules/common/i18n/languagesSupported';
import { routing } from '@/modules/common/i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as LanguagesSupportedType)) {
    notFound();
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
