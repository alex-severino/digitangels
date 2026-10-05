import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
