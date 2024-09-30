/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/modules/common/i18n/request.ts');
const nextConfig = {};

export default withNextIntl(nextConfig);
