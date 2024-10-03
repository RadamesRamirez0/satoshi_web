import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Satoshi Payments',
  description: 'La forma más fácil de comprar cripto.',
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
      <body className='flex flex-col p-4'>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position='top-center' />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
