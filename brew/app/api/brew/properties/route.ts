import { NextResponse } from "next/server"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_BAYHAN_API_URL
const SERVER_API_URL = process.env.BAYHAN_API_URL
const BAYHAN_API_URL = SERVER_API_URL || PUBLIC_API_URL || "https://bayhan.tech"

export async function GET() {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    const serverToken = process.env.BAYHAN_API_TOKEN
    if (serverToken) {
      headers["Authorization"] = `Bearer ${serverToken}`
    }
    const res = await fetch(`${BAYHAN_API_URL}/api/properties`, {
      headers,
      cache: "no-store",
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ properties: [] }, { status: 500 })
  }
}


