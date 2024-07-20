/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const config = {
  ...nextConfig,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swapi.dev",
        pathname: "/api/people/**",
      },
    ],
  },
};

export default nextConfig;
