import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import NavigationLayout from '@/modules/common/shared-ui/layouts/NavigationLayout';

export const metadata: Metadata = {
  title: 'Anuncios P2P Market | Noticias y Actualizaciones - Satoshi Payments',
  description:
    'Consulta los anuncios más recientes del P2P Market de Satoshi Payments. Descubre nuevas funcionalidades y mejoras para el intercambio seguro de criptomonedas',
};

export default function AnnouncementsLayout({ children }: PropsWithChildren) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
