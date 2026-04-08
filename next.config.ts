import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/partneri",
        destination: "/jak-pomoci#partneri",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
