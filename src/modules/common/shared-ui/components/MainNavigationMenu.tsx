import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { FC } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { Link } from '@/modules/common/i18n/routing';
import NavDropdown from '@/modules/common/shared-ui/components/NavDropdown';
import NavigationItem from '@/modules/common/shared-ui/components/NavigationItem';
import { Button } from '@/modules/common/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/common/ui/components/popover';

export type MainNavegationMenuProps = object;

export const MainNavigationMenu: FC<MainNavegationMenuProps> = () => {
  const t = useTranslations('MainNavigationMenu');

  return (
    <nav className='flex items-center justify-between h-16 px-6 bg-muted text-background rounded-2xl '>
      <ul className='flex items-center'>
        <li className='mr-6'>
          <Image src='/svg/satoshi_logo.svg' width={130} height={36} alt='Satoshi Logo' />
        </li>
        <NavigationItem>
          <Link href='/express'>{t('buyCrypto')}</Link>
        </NavigationItem>
        <NavigationItem>
          <Link href='/p2p'>{t('p2p')}</Link>
        </NavigationItem>
      </ul>
      <ul className='flex items-center'>
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
              <NavDropdown />
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </nav>
  );
};
