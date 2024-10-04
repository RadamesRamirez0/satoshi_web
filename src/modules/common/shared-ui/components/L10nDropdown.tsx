import React from 'react';

import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';

const L10nDropdown = () => {
  return (
    <form action='/api/i18n/change-language' method='POST'>
      <p className='px-4 py-2 font-bold bg-zinc-700'>Language</p>
      <NavDropdownItem type='submit' name='newLang' value='en' size='sm'>
        English
      </NavDropdownItem>
      <NavDropdownItem type='submit' name='newLang' value='es' size='sm'>
        Español
      </NavDropdownItem>
    </form>
  );
};

export default L10nDropdown;
