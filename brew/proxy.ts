import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  getClientIP,
  checkRateLimit,
  validateRequest,
  isIPBlocked,
} from "@/lib/security"

export function proxy(request: NextRequest) {
  const { nextUrl } = request
  const isApiRoute = nextUrl.pathname.startsWith("/api")

  // Güvenlik kontrolleri
  const ip = getClientIP(request)

  // IP engelleme kontrolü
  if (isIPBlocked(ip)) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  // Request validation
  const validation = validateRequest(request)
  if (!validation.valid) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  // Rate limiting
  const rateLimit = checkRateLimit(ip, isApiRoute)
  if (!rateLimit.allowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
        "X-RateLimit-Limit": String(isApiRoute ? 20 : 100),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(rateLimit.resetTime),
      },
    })
  }

  // Rate limit bilgilerini header'a ekle
  const response = NextResponse.next()
  response.headers.set("X-RateLimit-Limit", String(isApiRoute ? 20 : 100))
  response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining))
  response.headers.set("X-RateLimit-Reset", String(rateLimit.resetTime))

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

