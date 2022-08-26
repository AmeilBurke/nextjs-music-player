/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['chillhop.com'],
  },
};

module.exports = nextConfig;
