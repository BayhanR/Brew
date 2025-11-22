const PUBLIC_API_URL = process.env.NEXT_PUBLIC_BAYHAN_API_URL
const SERVER_API_URL = process.env.BAYHAN_API_URL
const BAYHAN_API_URL = PUBLIC_API_URL || SERVER_API_URL || 'https://bayhan.tech'
const RELATIVE_BREW_PROPERTIES = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/brew/properties`

export interface BrewProperty {
  id: string
  title: string
  description: string
  status: 'completed' | 'ongoing' | null
  year: number | null
  progress: number | null
  city: string | null
  district: string | null
  createdAt: string
  images: string[]
}

export async function getBrewProperties(): Promise<BrewProperty[]> {
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
    // İstemci tarafında CORS'a takılmamak için kendi API proxy'mizi kullan
    const isBrowser = typeof window !== 'undefined'
    const url = isBrowser ? RELATIVE_BREW_PROPERTIES : `${BAYHAN_API_URL}/api/properties`
    // İstemciye Authorization göndermiyoruz; server proxy header'ı ekleyecek
    const clientSafeHeaders = isBrowser ? { 'Content-Type': 'application/json' } : headers
    const response = await fetch(url, { headers: clientSafeHeaders, cache: 'no-store' })
    if (!response.ok) {
      console.error(`Brew API error: ${response.status}`)
      return []
    }
    const data = await response.json()
    return data.properties || []
  } catch (error) {
    console.error('Brew properties fetch error:', error)
    return []
  }
}


