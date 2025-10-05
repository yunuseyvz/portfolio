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
        destination: "http://cocs0g04scsoo8g44o8kg40w.157.90.226.112.sslip.io/"
      },
      {
        source: "/TemplateData/:path*",
        destination: "http://cocs0g04scsoo8g44o8kg40w.157.90.226.112.sslip.io/TemplateData/:path*"
      },
      {
        source: "/Build/:path*",
        destination: "http://cocs0g04scsoo8g44o8kg40w.157.90.226.112.sslip.io/Build/:path*"
      },
      {
        source: "/cv",
        destination: "/api/generate-cv"
      },
      {
        source: "/bachelorthesis",
        destination: "/bachelorthesis-6l8tvuSS0YkNXorjmkbF8quiugjLpI.pdf"
      },
      {
        source: "/certificate-of-excellence",
        destination: "/excellence-HfSaGvfqqb1rhWqnc1BLXNmjxOZZW8.jpg"
      }
    ];
  }
};

export default nextConfig;