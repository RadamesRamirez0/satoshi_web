import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import '../globals.css';

import ActiveOrderBanner from '@/modules/common/shared-ui/components/ActiveOrderBanner';

export const metadata: Metadata = {
  title: 'Satoshi Payments',
  description: 'La forma más fácil de comprar cripto.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  height: 'device-height',
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
};
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`font-satoshi antialiased dark h-full`}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className='flex flex-col'>
        <NextIntlClientProvider messages={messages}>
          <ActiveOrderBanner />
          {children}
          <Toaster position='top-center' />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
