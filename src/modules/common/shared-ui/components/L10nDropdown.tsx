import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';

const L10nDropdown = async () => {
  const t = await getTranslations('UserDropdown');

  return (
    <div className='overflow-hidden'>
      {/* Terminal-style header */}
      <div className='bg-zinc-800/60 px-4 py-3 border-b border-zinc-700/50'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1.5'>
            <div className='w-2 h-2 rounded-full bg-red-500'></div>
            <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
          </div>
          <span className='text-zinc-400 text-xs font-mono'>{t('language')}</span>
        </div>
      </div>

      {/* Language options */}
      <div className='p-2 space-y-1'>
        <NavDropdownItem
          type='submit'
          name='newLang'
          value='en'
          size='sm'
          asChild
          className='group hover:bg-zinc-800/60 rounded-lg border border-transparent hover:border-zinc-700/50 transition-all duration-200'
        >
          <Link
            href='/api/i18n/change-language/en'
            className='flex items-center gap-3 font-mono text-sm'
          >
            <span className='text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              {'>'}
            </span>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>🇺🇸</span>
              <span className='text-zinc-300 group-hover:text-primary transition-colors duration-200'>
                {(await getTranslations('Languages'))('english')}
              </span>
            </div>
          </Link>
        </NavDropdownItem>

        <NavDropdownItem
          type='submit'
          name='newLang'
          value='es'
          size='sm'
          asChild
          className='group hover:bg-zinc-800/60 rounded-lg border border-transparent hover:border-zinc-700/50 transition-all duration-200'
        >
          <Link
            href='/api/i18n/change-language/es'
            className='flex items-center gap-3 font-mono text-sm'
          >
            <span className='text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              {'>'}
            </span>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>🇪🇸</span>
              <span className='text-zinc-300 group-hover:text-primary transition-colors duration-200'>
                {(await getTranslations('Languages'))('spanish')}
              </span>
            </div>
          </Link>
        </NavDropdownItem>
      </div>
    </div>
  );
};

export default L10nDropdown;
