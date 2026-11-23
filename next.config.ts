import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Keep production builds within the memory budget of this development machine.
  experimental: { cpus: 2 },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
