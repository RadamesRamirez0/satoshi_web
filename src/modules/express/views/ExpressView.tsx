import React from 'react';

import AdvantagesSection from '@/modules/express/components/AdvantagesSection';
import ClientWrapper from '@/modules/express/components/ClientWrapper';
import Footer from '@/modules/express/components/Footer';
import HowToSection from '@/modules/express/components/HowToSection';
import WidgetSection from '@/modules/express/components/WidgetSection';

const ExpressView = () => {
  return (
    <>
      <ClientWrapper>
        <WidgetSection />
        <HowToSection />
      </ClientWrapper>
      <AdvantagesSection />
      <Footer />
    </>
  );
};

export default ExpressView;
