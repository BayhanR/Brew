import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: "standalone", // production için bağımsız build
  productionBrowserSourceMaps: false,
  // Next.js 16+ ile Turbopack varsayılan. Boş konfigürasyon eklemek uyarıları susturur.
  turbopack: {},
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.VERCEL ? '1' : '0',
  },

  images: {
    unoptimized: true, // prod’da image optimizer hatası veriyordu
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bayhan.tech',
        pathname: '/api/images/**',
      },
    ],
  },

  async redirects() {
    if (!isProd) return []
    return [
      // örnek redirect
      {
        source: '/portfolio',
        destination: '/gallery',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
 