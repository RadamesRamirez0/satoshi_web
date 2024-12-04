/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/modules/common/i18n/request.ts');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bkacontent.com',
      },
      {
        protocol: 'https',
        hostname: 'satoshipayments.sfo3.cdn.digitaloceanspaces.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
