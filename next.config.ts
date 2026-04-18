import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
    // Quality is now explicit for external images in Next 16
    qualities: [60, 75, 85, 90, 95],
  },
};

export default nextConfig;
