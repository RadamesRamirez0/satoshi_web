'use server';

import { redirect } from 'next/navigation';

import { deleteSession } from '@/app/api/auth/lib/session';

export const logout = (): void => {
  deleteSession();

  // const referer = headers().get('referer');
  // const redirectTo = !referer || referer.includes('login') ? '/' : referer;

  redirect('/');
};
