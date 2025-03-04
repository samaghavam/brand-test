import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: ["ginjmrvsyfbvxccpdqhq.supabase.co"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@heroui/react", "framer-motion", "react-icons"],
  },

  // Configure headers for better security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
