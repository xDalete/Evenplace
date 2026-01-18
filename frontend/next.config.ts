// next.config.ts (or .js)
import type { NextConfig } from "next";

const API_URL = process.env.API_URL || "http://localhost:8000";
const IMAGES_PATH = process.env.IMAGES_PATH || `${API_URL}/storage/banners/`;

const nextConfig: NextConfig = {
  env: {
    API_URL,
    IMAGES_PATH
  },

  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",

    remotePatterns: [
      { hostname: "127.0.0.1", pathname: "/storage/**", port: "8000", protocol: "http" },
      { hostname: "localhost", pathname: "/storage/**", port: "8000", protocol: "http" },
      //TODO: remove this and prevent backend from returning full URLs for images
      { hostname: "via.placeholder.com", protocol: "https" }
    ]
  },

  async rewrites() {
    return [
      {
        destination: `${API_URL}/:path*`,
        source: "/api/:path*"
      }
    ];
  }
};

export default nextConfig;
