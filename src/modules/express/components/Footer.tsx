import React from 'react';

import { Link } from '@/modules/common/i18n/routing';
import { Button } from '@/modules/common/ui/components/button';

const Footer = () => {
  return (
    <footer className='relative mt-20 pt-16 pb-8'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent'></div>
        <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Legal text */}
        <div className='bg-gradient-to-br from-zinc-900/40 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8'>
          <p className='text-zinc-400 text-sm leading-relaxed'>
            Satoshi (Satoshi Payments, S.A.S. de C.V.) es una aplicación que ofrece el
            servicio de intermediación y administración para la compra, venta y
            almacenamiento de activos virtuales. Satoshi es una empresa no regulada y cuyo
            producto no es garantizado por ninguna autoridad financiera.
            Independientemente de lo anterior, Satoshi se sujeta al régimen de actividades
            vulnerables establecido en la Ley Federal de Prevención e Identificación de
            Operaciones con Recursos de Procedencia Ilícita. Todas las marcas comerciales
            o referencia de terceros (incluidos sus diseños o logotipos) a las que se hace
            referencia, son propiedad de sus respectivos propietarios y/o titulares. El
            uso que Satoshi le da a dichos registros marcarios propiedad de terceros no
            indica ninguna relación marcaria o comercial, patrocinio, asociación o endoso
            comercial entre albit y los propietarios de dichos registros marcarios.
            Cualquier referencia dada respecto de marcas de terceros es para identificar
            los productos y/o servicios de terceros y se considerará un uso razonable con
            fines informativos. La presente declaración tiene como finalidad evitar alguna
            asociación entre los titulares, así como error o confusión marcaria.
          </p>
        </div>

        {/* Links */}
        <div className='flex flex-wrap justify-center gap-6'>
          <Link href='/terminos-y-condiciones'>
            <Button
              variant='link'
              className='text-zinc-300 hover:text-primary transition-colors duration-200 font-medium'
            >
              Términos y condiciones del servicio
            </Button>
          </Link>
          <Link href='/aviso-de-riesgo'>
            <Button
              variant='link'
              className='text-zinc-300 hover:text-primary transition-colors duration-200 font-medium'
            >
              Aviso de riesgo
            </Button>
          </Link>
        </div>

        {/* Company name */}
        <div className='text-center pt-6 border-t border-zinc-700/30'>
          <p className='text-zinc-500 font-medium'>Satoshi Payments, S.A.S. de C.V.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
