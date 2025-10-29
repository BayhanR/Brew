import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
const canonicalUrl = `${siteUrl}${basePath || ""}/`

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BREW Gayrimenkul - Geleceğin Yaşam Alanlarını İnşa Ediyoruz",
    template: "%s | BREW Gayrimenkul",
  },
  description: "Kat Karşılığı Daire, Müteahhitlik ve Emlak Hizmetleri",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: "BREW Gayrimenkul",
    locale: "tr_TR",
    images: [
      {
        url: `${basePath}/modern-building-construction.png`,
        width: 1200,
        height: 630,
        alt: "BREW Gayrimenkul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BREW Gayrimenkul - Geleceğin Yaşam Alanlarını İnşa Ediyoruz",
    description: "Kat Karşılığı Daire, Müteahhitlik ve Emlak Hizmetleri",
    images: [`${basePath}/modern-building-construction.png`],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased brand-pattern`}
        style={{ ["--bg-arkaplan" as any]: `url(${basePath}/images/arkaplan.png)` }}
      >
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BREW Gayrimenkul",
              url: canonicalUrl,
              logo: `${siteUrl}${basePath}/images/brew-logo.png`,
              sameAs: [
                "https://www.instagram.com/brewgayrimenkul",
                "https://linkedin.com",
              ],
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
