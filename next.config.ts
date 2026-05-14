import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
=======
    // Apnar domains array-te "i.pravatar.cc" add korun
    domains: ["via.placeholder.com", "i.pravatar.cc"],
>>>>>>> 833ed2d8fdd2f74609cc0434e0684db007c394e4
  },
};

export default nextConfig;
