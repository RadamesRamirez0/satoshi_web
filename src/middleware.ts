import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes } from '@/modules/auth/constants/routesAuthorizations';
import { intlMiddleware } from '@/modules/common/middlewares/intlMiddleware';

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  const [, locale] = request.nextUrl.pathname.split('/');

  const isProtectedRoute = protectedRoutes.includes(path);

  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie && isProtectedRoute) {
    request.nextUrl.pathname = `/${locale}/auth/login`;
  }

  const response = intlMiddleware(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*'],
};
