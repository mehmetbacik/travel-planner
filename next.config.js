/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'tr', 'es', 'de', 'fr'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
}

module.exports = nextConfig 