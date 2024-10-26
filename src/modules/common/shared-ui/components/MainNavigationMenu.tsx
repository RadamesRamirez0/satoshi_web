import { DownloadIcon, GlobeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { headers } from 'next/headers';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';
import { FC } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { getSession } from '@/app/api/auth/sessionAction';
import { Link } from '@/modules/common/i18n/routing';
import L10nDropdown from '@/modules/common/shared-ui/components/L10nDropdown';
import NavigationItem from '@/modules/common/shared-ui/components/NavigationItem';
import UserNavDropdown from '@/modules/common/shared-ui/components/UserNavDropdown';
import { Button } from '@/modules/common/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/common/ui/components/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/modules/common/ui/components/sheet';
import { cn } from '@/modules/common/ui/lib/utils';

export type MainNavegationMenuProps = object;

export const MainNavigationMenu: FC<MainNavegationMenuProps> = async () => {
  const t = await getTranslations('MainNavigationMenu');
  const session = await getSession();
  const headerList = headers();

  const path = headerList.get('x-current-path');

  return (
    <nav className='flex items-center justify-between h-16  px-6 bg-muted text-background rounded-2xl m-4'>
      <ul className='flex items-center h-16'>
        <li className='mr-6'>
          <Image src='/svg/satoshi_logo.svg' width={119} height={31} alt='Satoshi Logo' />
        </li>
        <NavigationItem
          className={cn(path?.includes('/express') && 'text-primary', 'hidden md:flex')}
        >
          <Link href='/express'>{t('buyCrypto')}</Link>
        </NavigationItem>
        <NavigationItem
          className={cn(
            path?.includes('/p2p/announcements') && 'text-primary',
            'hidden md:flex',
          )}
        >
          <Link href='/p2p/announcements'>{t('p2p')}</Link>
        </NavigationItem>
      </ul>
      <ul className='flex items-center gap-4'>
        {session && (
          <>
            <li className='pr-2 hidden md:flex'>
              <Button className='text-base' asChild>
                <Link href='/users/me/deposit'>
                  <DownloadIcon className='w-5 h-5 mr-2' />
                  {t('deposit')}
                </Link>
              </Button>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='string' size='icon'>
                    <FaRegCircleUser className='w-full h-full' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align='end'
                  side='bottom'
                  sideOffset={30}
                  alignOffset={-26}
                  className='border-none bg-muted p-0'
                >
                  <UserNavDropdown />
                </PopoverContent>
              </Popover>
            </li>
          </>
        )}
        {!session && (
          <>
            <li className='hidden md:flex'>
              <Button variant='secondary' size='default' asChild>
                <Link href='/auth/login'>{t('logIn')}</Link>
              </Button>
            </li>
            <li className='hidden md:flex'>
              <Button size='default' asChild>
                <Link href='/auth/register'>{t('signUp')}</Link>
              </Button>
            </li>
          </>
        )}
        <li className={cn(session && 'hidden md:flex')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='string' size='icon'>
                <GlobeIcon className='w-full h-full' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              side='bottom'
              sideOffset={30}
              alignOffset={-26}
              className='border-none bg-muted p-0 w-48'
            >
              <L10nDropdown />
            </PopoverContent>
          </Popover>
        </li>

        <li className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='string' size='icon'>
                <HamburgerMenuIcon className='size-6' />
              </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col' side='right'>
              <Image
                src='/svg/satoshi_logo.svg'
                width={119}
                height={31}
                alt='Satoshi Logo'
              />

              <span className='w-full flex gap-3'>
                <Button variant='secondary' size='default' asChild className='flex-1'>
                  <Link href='/auth/login'>{t('logIn')}</Link>
                </Button>
                <Button size='default' asChild className='flex-1'>
                  <Link href='/auth/register'>{t('signUp')}</Link>
                </Button>
              </span>
              <ul>
                <NavigationItem
                  className={cn(
                    path?.includes('/express') && 'text-primary',
                    'w-full justify-start',
                  )}
                >
                  <Link href='/express'>{t('buyCrypto')}</Link>
                </NavigationItem>
                <NavigationItem
                  className={cn(
                    path?.includes('/p2p/announcements') && 'text-primary',
                    'text-left w-full justify-start',
                  )}
                >
                  <Link href='/p2p/announcements'>{t('p2p')}</Link>
                </NavigationItem>
              </ul>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
};
