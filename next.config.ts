import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
}

export default nextConfig
