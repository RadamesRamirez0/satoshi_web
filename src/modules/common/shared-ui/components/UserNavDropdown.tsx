import { DashboardIcon, GlobeIcon } from '@radix-ui/react-icons';
import NativeLink from 'next/link';
import { getTranslations } from 'next-intl/server';
import React, { FC } from 'react';
import { CgLogOut } from 'react-icons/cg';

import { logout } from '@/app/api/auth/logoutAction';
import { getSession } from '@/app/api/auth/sessionAction';
import { Link } from '@/modules/common/i18n/routing';
import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';
import {
  NavigationAccordionContent,
  NavigationAccordionItem,
  NavigationAccordionTrigger,
} from '@/modules/common/shared-ui/components/NavigationAccordion';
import { Button } from '@/modules/common/ui/components/button';
import PhotoProfile from '@/modules/users/components/PhotoProfile';

export type UserNavDropdownProps = object;

const UserNavDropdown: FC<UserNavDropdownProps> = async () => {
  const t = await getTranslations('UserDropdown');
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { user } = session;

  return (
    <>
      <div className='flex px-6 py-4 gap-3'>
        <div className='size-12 shrink-0'>
          <PhotoProfile />
        </div>

        <div className='flex-1 flex justify-start'>
          <span>
            <p className='text-lg font-semibold text-primary'>{user.alias}</p>
            <p className='text-sm text-zinc-200'>{user.email}</p>
          </span>
        </div>
      </div>

      <div>
        <NavDropdownItem asChild>
          <Link href='/users/me'>
            <DashboardIcon className='size-5' />
            {t('dashboard')}
          </Link>
        </NavDropdownItem>
        <NavigationAccordionItem>
          <NavigationAccordionTrigger>
            <GlobeIcon className='size-5' />
            {t('language')}
          </NavigationAccordionTrigger>
          <NavigationAccordionContent>
            <NavDropdownItem type='submit' name='newLang' value='en' size='sm' asChild>
              <NativeLink href='/api/i18n/change-language/en'>English</NativeLink>
            </NavDropdownItem>
            <NavDropdownItem type='submit' name='newLang' value='es' size='sm' asChild>
              <NativeLink href='/api/i18n/change-language/es'>Español</NativeLink>
            </NavDropdownItem>
          </NavigationAccordionContent>
        </NavigationAccordionItem>
        {/* <NavDropdownItem>
          <GearIcon className='size-5' />
          {t('settings')}
        </NavDropdownItem> */}
      </div>
      <form action={logout}>
        <Button
          className='w-full gap-3 rounded-t-none justify-start px-6'
          variant='destructive'
          size='md'
        >
          <CgLogOut className='size-5' />
          {t('logout')}
        </Button>
      </form>
    </>
  );
};

export default UserNavDropdown;
