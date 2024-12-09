import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  serverExternalPackages: ['typeorm'],
};

export default nextConfig;
