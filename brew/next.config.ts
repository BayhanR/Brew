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

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },
}

export default nextConfig
 