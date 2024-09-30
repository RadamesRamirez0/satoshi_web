import createMiddleware from 'next-intl/middleware';

import { routing } from '@/modules/common/i18n/routing';

export const intlMiddleware = createMiddleware(routing);
