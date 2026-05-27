import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_BUILD_TARGET === 'github';

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    images: { unoptimized: true },
  }),
  turbopack: {},
  webpack(config) {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/.playwright-mcp/**', '**/node_modules/**'],
    }
    return config
  },
};

export default nextConfig;
