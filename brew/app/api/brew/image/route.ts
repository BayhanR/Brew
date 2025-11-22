import { NextRequest } from "next/server"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_BAYHAN_API_URL
const SERVER_API_URL = process.env.BAYHAN_API_URL
const BAYHAN_API_URL = SERVER_API_URL || PUBLIC_API_URL || "https://bayhan.tech"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  if (!url) {
    return new Response("Missing url", { status: 400 })
  }
  try {
    const target = new URL(url)
    // Yalnızca /api/images/* yollarına izin ver
    if (!target.pathname.startsWith("/api/images/") || (target.protocol !== "https:" && target.protocol !== "http:")) {
      return new Response("Forbidden", { status: 403 })
    }
    // Upstream host'u her zaman BAYHAN_API_URL'in hostuna çevir (örn. localhost:3002 -> bayhan.tech)
    const upstreamBase = new URL(BAYHAN_API_URL)
    const upstream = new URL(target.pathname + target.search, upstreamBase)
    const headers: HeadersInit = {}
    const token = process.env.BAYHAN_API_TOKEN
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const res = await fetch(upstream.toString(), { headers, cache: "no-store" })
    const contentType = res.headers.get("content-type") || "application/octet-stream"
    const body = res.body
    if (!body) {
      return new Response("No content", { status: 502 })
    }
    return new Response(body, {
      status: res.status,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=300",
      },
    })
  } catch {
    return new Response("Upstream error", { status: 502 })
  }
}


