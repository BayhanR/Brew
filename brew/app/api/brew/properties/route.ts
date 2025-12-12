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
    
    const apiUrl = `${BAYHAN_API_URL}/api/properties`
    
    const res = await fetch(apiUrl, {
      headers,
      cache: "no-store",
    })
    
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error')
      console.error(`[Brew API] ${res.status} error from ${apiUrl}:`, errorText)
      return NextResponse.json(
        { 
          properties: [], 
          error: `API returned ${res.status}`,
          message: process.env.NODE_ENV === 'development' ? errorText : undefined
        }, 
        { status: res.status }
      )
    }
    
    const data = await res.json().catch((parseError) => {
      console.error('[Brew API] JSON parse error:', parseError)
      return { properties: [] }
    })
    
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('[Brew API] Fetch error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        properties: [], 
        error: 'Failed to fetch properties',
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 
      { status: 500 }
    )
  }
}


