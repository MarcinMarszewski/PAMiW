import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // other config options here
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  ...nextConfig,
});