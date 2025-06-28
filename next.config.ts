import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "example.com",
      "images.unsplash.com",
      "cdn.domain.com",
      "ui-avatars.com",
    ],
  },
};

export default nextConfig;
