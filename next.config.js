/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

module.exports = nextConfig;
