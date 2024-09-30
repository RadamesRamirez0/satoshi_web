import React, { FC, PropsWithChildren } from 'react';

import NavDropdownItem from '@/modules/common/shared-ui/components/NavDropdownItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/common/ui/components/accordion';

export const NavigationAccordionItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='1' className='w-full'>
        {children}
      </AccordionItem>
    </Accordion>
  );
};

export const NavigationAccordionContent: FC<PropsWithChildren> = ({ children }) => {
  return <AccordionContent className='bg-zinc-700'>{children}</AccordionContent>;
};
export const NavigationAccordionTrigger: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NavDropdownItem asChild className='w-full'>
      <AccordionTrigger className='w-full'>{children}</AccordionTrigger>
    </NavDropdownItem>
  );
};
