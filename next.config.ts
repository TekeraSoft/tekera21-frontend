import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "fakeimg.pl",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "http",
        hostname: "192.168.1.105",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
