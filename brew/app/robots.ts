import type { MetadataRoute } from "next"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteUrl}${basePath || ""}/sitemap.xml`
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: sitemapUrl,
  }
}




