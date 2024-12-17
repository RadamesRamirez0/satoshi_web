import React from 'react';

import { Link } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';

const Footer = () => {
  return (
    <footer className='border-t mt-10 pt-10 flex flex-col items-center gap-3'>
      <p className='text-whiteBG/50'>
        Satoshi (Satoshi Payments, S.A.S. de C.V.) es una aplicación que ofrece el
        servicio de intermediación y administración para la compra, venta y almacenamiento
        de activos virtuales. Satoshi es una empresa no regulada y cuyo producto no es
        garantizado por ninguna autoridad financiera. Independientemente de lo anterior,
        Satoshi se sujeta al régimen de actividades vulnerables establecido en la Ley
        Federal de Prevención e Identificación de Operaciones con Recursos de Procedencia
        Ilícita. Todas las marcas comerciales o referencia de terceros (incluidos sus
        diseños o logotipos) a las que se hace referencia, son propiedad de sus
        respectivos propietarios y/o titulares. El uso que Satoshi le da a dichos
        registros marcarios propiedad de terceros no indica ninguna relación marcaria o
        comercial, patrocinio, asociación o endoso comercial entre albit y los
        propietarios de dichos registros marcarios. Cualquier referencia dada respecto de
        marcas de terceros es para identificar los productos y/o servicios de terceros y
        se considerará un uso razonable con fines informativos. La presente declaración
        tiene como finalidad evitar alguna asociación entre los titulares, así como error
        o confusión marcaria.
      </p>
      <span>
        <Link href='/terminos-y-condiciones'>
          <Button variant='link'>Términos y condiciones del servicio</Button>
        </Link>
        <Link href='/aviso-de-riesgo'>
          <Button variant='link'>Aviso de riesgo</Button>
        </Link>
      </span>
      <p>Satoshi Payments, S.A.S. de C.V.</p>
    </footer>
  );
};

export default Footer;
