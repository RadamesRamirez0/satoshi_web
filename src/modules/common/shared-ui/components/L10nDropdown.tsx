import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';

const L10nDropdown = async () => {
  const t = await getTranslations('UserDropdown');

  return (
    <>
      <p className='px-4 py-2 font-bold bg-zinc-700'>{t('language')}</p>
      <NavDropdownItem type='submit' name='newLang' value='en' size='sm' asChild>
        <Link href='/api/i18n/change-language/en'>English</Link>
      </NavDropdownItem>
      <NavDropdownItem type='submit' name='newLang' value='es' size='sm' asChild>
        <Link href='/api/i18n/change-language/es'>Español</Link>
      </NavDropdownItem>
    </>
  );
};

export default L10nDropdown;
