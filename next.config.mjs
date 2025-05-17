import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
    unoptimized: process.env.CLOUDFLARE === "true",
  },
  // This is recommended for Cloudflare Pages deployment
  output: "standalone",
};

// Add this conditional for development environment
if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

export default nextConfig;
