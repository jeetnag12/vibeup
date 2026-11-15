/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/events", destination: "/discover", permanent: false }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
