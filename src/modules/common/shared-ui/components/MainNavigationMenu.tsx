import { DownloadIcon, GlobeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { headers } from 'next/headers';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';
import { FC } from 'react';

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
import PhotoProfile from '@/modules/users/components/PhotoProfile';

export type MainNavegationMenuProps = object;

export const MainNavigationMenu: FC<MainNavegationMenuProps> = async () => {
  const t = await getTranslations('MainNavigationMenu');
  const session = await getSession();
  const headerList = headers();

  const path = headerList.get('x-current-path');

  return (
    <nav className='flex items-center justify-between h-16 px-6 bg-gradient-to-r from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl m-4 shadow-2xl shadow-black/20'>
      {/* Subtle glow effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10'></div>

      <ul className='flex items-center h-16'>
        <li className='mr-8'>
          <Link href='/' className='group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <Image
                src='/svg/satoshi_logo.svg'
                width={119}
                height={31}
                alt='Satoshi Logo'
                className='relative filter brightness-110 group-hover:scale-105 transition-transform duration-200'
              />
            </div>
          </Link>
        </li>
        <NavigationItem
          className={cn(
            path?.includes('/express') && 'text-primary bg-primary/10 border-primary/20',
            'hidden md:flex font-mono text-sm hover:bg-zinc-800/50 border border-transparent rounded-lg px-4 py-2 transition-all duration-200',
          )}
        >
          <Link href='/express' className='flex items-center gap-2'>
            <span className='text-xs'>{'>'}</span>
            {t('buyCrypto')}
          </Link>
        </NavigationItem>
        <NavigationItem
          className={cn(
            path?.includes('/p2p/announcements') &&
              'text-primary bg-primary/10 border-primary/20',
            'hidden md:flex font-mono text-sm hover:bg-zinc-800/50 border border-transparent rounded-lg px-4 py-2 transition-all duration-200',
          )}
        >
          <Link href='/p2p/announcements' className='flex items-center gap-2'>
            <span className='text-xs'>{'>'}</span>
            {t('p2p')}
          </Link>
        </NavigationItem>
      </ul>
      <ul className='flex items-center gap-4'>
        {session && (
          <>
            <li className='pr-2 hidden md:flex'>
              <Button
                className='text-sm font-mono bg-gradient-to-r from-primary to-emerald-500 hover:from-emerald-500 hover:to-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105'
                asChild
              >
                <Link href='/users/me/deposit' className='flex items-center gap-2'>
                  <DownloadIcon className='w-4 h-4' />
                  <span className='text-xs'>{'>'}</span>
                  {(await getTranslations('Auth'))('depositAction')}
                </Link>
              </Button>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='string' size='icon' className='size-10 relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                    <PhotoProfile />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align='end'
                  side='bottom'
                  sideOffset={30}
                  alignOffset={-26}
                  className='border border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl p-0 shadow-2xl'
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
              <Button
                variant='secondary'
                size='default'
                className='font-mono text-sm bg-zinc-800/60 border border-zinc-600 hover:bg-zinc-700/60 hover:border-primary/50 transition-all duration-200'
                asChild
              >
                <Link href='/auth/login' className='flex items-center gap-2'>
                  <span className='text-xs'>{'>'}</span>
                  {(await getTranslations('Auth'))('loginAction')}
                </Link>
              </Button>
            </li>
            <li className='hidden md:flex'>
              <Button
                size='default'
                className='font-mono text-sm bg-gradient-to-r from-primary to-emerald-500 hover:from-emerald-500 hover:to-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105'
                asChild
              >
                <Link href='/auth/register' className='flex items-center gap-2'>
                  <span className='text-xs'>{'>'}</span>
                  {(await getTranslations('Auth'))('registerAction')}
                </Link>
              </Button>
            </li>
          </>
        )}
        <li>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='string'
                className='font-mono text-sm px-4 py-2 bg-gradient-to-r from-zinc-800/80 to-zinc-700/80 border border-zinc-600/50 hover:border-primary/50 rounded-xl backdrop-blur-sm hover:from-zinc-700/80 hover:to-zinc-600/80 transition-all duration-300 group relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='relative flex items-center gap-2'>
                  <GlobeIcon className='w-4 h-4 text-zinc-300 group-hover:text-primary transition-colors duration-200' />
                  <span className='text-zinc-300 group-hover:text-primary transition-colors duration-200'>
                    {(await getTranslations('Languages'))('currentLang')}
                  </span>
                  <div className='w-1 h-1 bg-primary rounded-full animate-pulse'></div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              side='bottom'
              sideOffset={15}
              alignOffset={-26}
              className='border border-zinc-700/50 bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 backdrop-blur-xl p-0 w-56 shadow-2xl rounded-xl overflow-hidden'
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

              <span className={cn('w-full  gap-3 hidden', !session && 'flex')}>
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
