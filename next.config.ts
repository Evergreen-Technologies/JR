import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

module.exports = {
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
};

export default withNextVideo(nextConfig);
