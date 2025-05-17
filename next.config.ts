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
  },
  // This is recommended for Cloudflare Pages deployment
  output: "standalone",
};

// Add this conditional for development environment
if (process.env.NODE_ENV === "development") {
  // Using dynamic import for ESM compatibility
  import("@cloudflare/next-on-pages/next-dev")
    .then(({ setupDevPlatform }) => {
      setupDevPlatform();
    })
    .catch(console.error);
}

export default nextConfig;
