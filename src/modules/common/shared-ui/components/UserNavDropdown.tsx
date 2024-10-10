import { DashboardIcon, GearIcon, GlobeIcon } from '@radix-ui/react-icons';
import NativeLink from 'next/link';
import { getTranslations } from 'next-intl/server';
import React, { FC } from 'react';
import { CgLogOut } from 'react-icons/cg';
import { FaRegCircleUser } from 'react-icons/fa6';

import { logout } from '@/app/api/auth/logoutAction';
import { Link } from '@/modules/common/i18n/routing';
import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';
import {
  NavigationAccordionContent,
  NavigationAccordionItem,
  NavigationAccordionTrigger,
} from '@/modules/common/shared-ui/components/NavigationAccordion';
import { Button } from '@/modules/common/ui/components/button';

export type UserNavDropdownProps = object;

const UserNavDropdown: FC<UserNavDropdownProps> = async () => {
  const t = await getTranslations('UserDropdown');

  return (
    <>
      <div className='flex px-6 py-4 justify-between'>
        <FaRegCircleUser className='size-12' />
        <div>
          <p className='text-lg font-semibold text-primary'>Radames Ramírez</p>
          {/* <p className='text-sm text-zinc-200'>radameskalel@gmail.com</p> */}
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
        <NavDropdownItem>
          <GearIcon className='size-5' />
          {t('settings')}
        </NavDropdownItem>
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
