import { NextRequest, NextResponse } from 'next/server';

import { intlMiddleware } from '@/modules/common/middlewares/intlMiddleware';

export function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  response.headers.set('x-current-path', request.nextUrl.pathname);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*'],
};
