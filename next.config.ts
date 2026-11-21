import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Reuse compiler work from Vercel's restored .next/cache on later deploys.
    turbopackFileSystemCacheForBuild: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "designwise.digitangels.com" }],
          destination: "/designwise",
        },
        {
          source: "/old",
          has: [{ type: "host", value: "designwise.digitangels.com" }],
          destination: "/designwise/old",
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/designwise",
        has: [{ type: "host", value: "(www\\.)?digitangels\\.com|designwise\\.digitangels\\.com" }],
        destination: "https://designwise.digitangels.com",
        permanent: true,
      },
      {
        source: "/designwise/old",
        has: [{ type: "host", value: "(www\\.)?digitangels\\.com|designwise\\.digitangels\\.com" }],
        destination: "https://designwise.digitangels.com/old",
        permanent: true,
      },
      {
        source: "/projects/digitangels",
        destination: "/digitangels",
        permanent: true,
      },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/work", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
