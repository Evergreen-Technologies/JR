import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

module.exports = {
  images: {
    domains: ["images.unsplash.com"], // {{ edit_1 }}
  },
  typescript: {
    ignoreBuildErrors: true, // This disables TypeScript type checking during the build
  },
  async headers() {
    return [
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all origins (customize as needed)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS", // Customize allowed methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization", // Customize allowed headers
          },
        ],
      },
    ];
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextVideo(nextConfig);
