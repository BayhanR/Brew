import type { MetadataRoute } from "next"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
const root = `${siteUrl}${basePath || ""}`

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  return [
    {
      url: `${root}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${root}/projeler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}


