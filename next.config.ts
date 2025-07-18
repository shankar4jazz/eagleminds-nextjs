import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    domains: ['res.cloudinary.com', 'eagleminds.net'],
    unoptimized: process.env.DEPLOY_TARGET === 'cloudflare',
  },
  // Enable static export for Cloudflare Pages
  output: process.env.DEPLOY_TARGET === 'cloudflare' ? 'export' : undefined,
  trailingSlash: process.env.DEPLOY_TARGET === 'cloudflare',
};

export default nextConfig;
