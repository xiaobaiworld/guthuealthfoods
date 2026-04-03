import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
