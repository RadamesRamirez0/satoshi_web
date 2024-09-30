import { NextRequest, NextResponse } from 'next/server';

import { intlMiddleware } from '@/modules/common/middlewares/intlMiddleware';

export function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*'],
};
