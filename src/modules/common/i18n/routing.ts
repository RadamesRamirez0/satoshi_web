import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { languagesSupported } from '@/modules/common/i18n/languagesSupported';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: languagesSupported,

  // Used when no locale matches
  defaultLocale: languagesSupported[0],
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
