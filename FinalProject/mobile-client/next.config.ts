import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  /* reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  distDir: 'out', // Specify the output directory
  output: 'export', // This is for Next.js static export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      // Add other paths here if needed
    };
  // other config options here
  } */
}

export default nextConfig;