/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable linting during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization
  images: {
    domains: ['localhost'],
  },
  // Optional: Add experimental features if needed
  experimental: {
    // Add any experimental features here
  },
};

module.exports = nextConfig;