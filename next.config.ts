import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cde.ucr.cjis.gov',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
