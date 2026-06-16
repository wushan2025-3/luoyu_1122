import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true, // 启用 PPR
  },
};

export default nextConfig;