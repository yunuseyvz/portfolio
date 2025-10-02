/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "482vinrqhnhtlafe.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "supabase.yuemya.de",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/game",
        destination: "https://lastchicken.vercel.app/"
      },
      {
        source: "/TemplateData/:path*",
        destination: "https://lastchicken.vercel.app/TemplateData/:path*"
      },
      {
        source: "/Build/:path*",
        destination: "https://lastchicken.vercel.app/Build/:path*"
      },
      {
        source: "/cv",
        destination: "/api/generate-cv"
      },
      {
        source: "/bachelorthesis",
        destination: "https://supabase.yuemya.de/storage/v1/object/public/portfolio/projects/bachelorthesis-6l8tvuSS0YkNXorjmkbF8quiugjLpI.pdf"
      },
      {
        source: "/certificate-of-excellence",
        destination: "https://supabase.yuemya.de/storage/v1/object/public/portfolio/projects/excellence-HfSaGvfqqb1rhWqnc1BLXNmjxOZZW8.jpg"
      }
    ];
  }
};

export default nextConfig;