import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import NavigationLayout from '@/modules/common/shared-ui/layouts/NavigationLayout';

export const metadata: Metadata = {
  title: 'Satoshi Payments Express | Compra Rápida de Criptomonedas',
  description:
    'Compra criptomonedas al instante con Satoshi Payments Express. Un método rápido, seguro y confiable para acceder al mundo cripto',
};

export default function ExpressLayout({ children }: PropsWithChildren) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
