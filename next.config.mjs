/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "482vinrqhnhtlafe.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;