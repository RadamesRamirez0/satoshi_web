import React from 'react';

import AdvantagesSection from '@/modules/express/components/AdvantagesSection';
import HowToSection from '@/modules/express/components/HowToSection';
import WidgetSection from '@/modules/express/components/WidgetSection';

const ExpressView = () => {
  return (
    <>
      <WidgetSection />
      <HowToSection />
      <AdvantagesSection />
    </>
  );
};

export default ExpressView;
