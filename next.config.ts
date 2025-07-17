import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    domains: ['res.cloudinary.com', 'eagleminds.net'],
  },
};

export default nextConfig;
