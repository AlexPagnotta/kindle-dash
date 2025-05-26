import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // The pre-commit hook takes care of linting
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
