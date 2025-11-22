const PUBLIC_API_URL = process.env.NEXT_PUBLIC_BAYHAN_API_URL
const SERVER_API_URL = process.env.BAYHAN_API_URL
const BAYHAN_API_URL = PUBLIC_API_URL || SERVER_API_URL || 'https://bayhan.tech'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function getBrewPropertyImageUrl(propertyId: string, fileName: string): string {
  return `${BAYHAN_API_URL}/api/images/properties/${propertyId}/${fileName}`
}

export async function getBrewPropertyImages(propertyId: string): Promise<string[]> {
  if (String(process.env.USE_BAYHAN_API).toLowerCase() === 'false') {
    return []
  }
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    const publicToken = process.env.NEXT_PUBLIC_BAYHAN_API_TOKEN
    const serverToken = process.env.BAYHAN_API_TOKEN
    const token = publicToken || serverToken
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(`${BAYHAN_API_URL}/api/images/public/properties/${propertyId}`, { headers, cache: 'no-store' })
    if (!response.ok) {
      console.error(`Brew API error: ${response.status}`)
      return []
    }
    const data = await response.json()
    const images: string[] = data.images || []
    return images.map(toBrewProxyUrl)
  } catch (error) {
    console.error('Brew property images fetch error:', error)
    return []
  }
}

export function toBrewProxyUrl(url: string): string {
  try {
    const u = new URL(url)
    // Upstream hangi host olursa olsun, yalnızca /api/images/* yollarını kendi proxy'mize çevir
    if (u.pathname.startsWith('/api/images/')) {
      return `${BASE_PATH}/api/brew/image?url=${encodeURIComponent(url)}`
    }
    return url
  } catch {
    return url
  }
}



