/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.antoinepiney.fr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
