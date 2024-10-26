'use client';

import { Cross1Icon, DownloadIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Link, usePathname } from '@/modules/common/i18n/routing';
import L10nDropdown from '@/modules/common/shared-ui/components/L10nDropdown';
import NavigationItem from '@/modules/common/shared-ui/components/NavigationItem';
import UserNavDropdown from '@/modules/common/shared-ui/components/UserNavDropdown';
import { Button } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations('MainNavigationMenu');
  const path = usePathname();
  const session = useSession();

  return (
    <div className={cn('md:hidden', isOpen ? 'block' : 'hidden')}>
      <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
        <NavigationItem
          className={cn(path.includes('/express') && 'text-primary', 'block')}
        >
          <Link href='/express'>{t('buyCrypto')}</Link>
        </NavigationItem>
        <NavigationItem
          className={cn(path.includes('/p2p/announcements') && 'text-primary', 'block')}
        >
          <Link href='/p2p/announcements'>{t('p2p')}</Link>
        </NavigationItem>
      </div>
      <div className='pt-4 pb-3 border-t border-gray-700'>
        <div className='flex items-center px-5'>
          {session?.token && (
            <>
              <Button className='text-base w-full justify-center' asChild>
                <Link href='/users/me/deposit'>
                  <DownloadIcon className='w-5 h-5 mr-2' />
                  {t('deposit')}
                </Link>
              </Button>
            </>
          )}
          {!session?.token && (
            <>
              <Button
                variant='secondary'
                size='default'
                asChild
                className='mr-2 w-full justify-center'
              >
                <Link href='/auth/login'>{t('logIn')}</Link>
              </Button>
              <Button size='default' asChild className='w-full justify-center'>
                <Link href='/auth/register'>{t('signUp')}</Link>
              </Button>
            </>
          )}
        </div>
        <div className='mt-3 px-2 space-y-1'>
          {session?.token && <UserNavDropdown />}
          <L10nDropdown />
        </div>
      </div>
    </div>
  );
};

export const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Button
      variant='string'
      size='icon'
      onClick={() => setIsOpen(!isOpen)}
      aria-label='Main menu'
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <Cross1Icon className='block h-6 w-6' aria-hidden='true' />
      ) : (
        <HamburgerMenuIcon className='block h-6 w-6' aria-hidden='true' />
      )}
    </Button>
  );
};
