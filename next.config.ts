import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xdlxjxmeumcdyrnxaizx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**"
      }
    ]
  }
};

export default nextConfig;
