# 🏢 Brew Gayrimenkul - Resim Çekme Rehberi

> ✅ **GÜNCEL:** Bu dökümantasyon 2024 güncellemesi ile hazırlanmıştır.  
> Her property için ayrı status, year, progress, city, district bilgileri mevcuttur.

## 📋 Genel Bilgi

**Site:** Brew Gayrimenkul  
**Category:** `brew`  
**Veri Tipi:** Properties (Emlak İlanları)  
**API Base URL:** `https://bayhan.tech`  
**Ana Endpoint:** `GET /api/properties` (Tüm property'leri ve bilgilerini döndürür)

---

## 🏗️ Property Sistemi

Brew Gayrimenkul, **emlak ilanları** (properties) kullanır. Her property şu bilgileri içerir:

- **Status:** `completed` (Biten) veya `ongoing` (Devam Eden)
- **Year:** Tamamlanma yılı (sadece biten inşaatlar için)
- **Progress:** Tamamlanma yüzdesi 0-100 (sadece devam eden inşaatlar için)
- **City:** İl (örn: İzmir, İstanbul)
- **District:** İlçe (örn: Konak, Kadıköy)
- **Images:** Fotoğraflar (tam URL'ler)

---

## ⚡ Hızlı Başlangıç

**En kolay yöntem:** `GET /api/properties` endpoint'ini kullanarak tüm property'leri ve bilgilerini tek seferde çekin:

```typescript
// lib/bayhan-properties.ts
const BAYHAN_API_URL = process.env.BAYHAN_API_URL || 'https://bayhan.tech'

export async function getBrewProperties() {
  const response = await fetch(`${BAYHAN_API_URL}/api/properties`)
  const data = await response.json()
  return data.properties // Tüm property'ler, resimler ve bilgileri ile
}
```

**Response formatı:**
```json
{
  "properties": [
    {
      "id": "...",
      "title": "2024 - İstanbul / Kadıköy - Biten İnşaat",
      "status": "completed",
      "year": 2024,
      "city": "İstanbul",
      "district": "Kadıköy",
      "images": ["https://bayhan.tech/api/images/..."]
    }
  ]
}
```

---

## 📸 Resim Çekme Yöntemleri

### Yöntem 1: Tekil Resim URL'i (Önerilen)

Bir property'nin belirli bir resmini çekmek için:

```typescript
// lib/bayhan-images.ts
const BAYHAN_API_URL = process.env.BAYHAN_API_URL || 'https://bayhan.tech'

export function getBrewPropertyImageUrl(
  propertyId: string,
  fileName: string
): string {
  return `${BAYHAN_API_URL}/api/images/properties/${propertyId}/${fileName}`
}
```

**Kullanım:**
```tsx
import Image from 'next/image'
import { getBrewPropertyImageUrl } from '@/lib/bayhan-images'

// Property ID ve dosya adını bilmeniz gerekiyor
const imageUrl = getBrewPropertyImageUrl('property-uuid', '1234567890-abc123.jpg')

<Image
  src={imageUrl}
  alt="Brew Property"
  width={800}
  height={600}
/>
```

---

### Yöntem 2: Property'nin Tüm Resimlerini Çek

Bir property'nin tüm resimlerini listelemek için:

```typescript
// lib/bayhan-images.ts

export async function getBrewPropertyImages(
  propertyId: string
): Promise<string[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    // Token varsa ekle (opsiyonel)
    if (process.env.BAYHAN_API_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.BAYHAN_API_TOKEN}`
    }
    
    const response = await fetch(
      `${BAYHAN_API_URL}/api/images/public/properties/${propertyId}`,
      { headers }
    )
    
    if (!response.ok) {
      console.error(`Brew API error: ${response.status}`)
      return []
    }
    
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Brew property images fetch error:', error)
    return []
  }
}
```

**Kullanım:**
```tsx
'use client'

import { useEffect, useState } from 'react'
import { getBrewPropertyImages } from '@/lib/bayhan-images'
import Image from 'next/image'

export function BrewPropertyGallery({ propertyId }: { propertyId: string }) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = await getBrewPropertyImages(propertyId)
      setImages(imageUrls)
      setLoading(false)
    }
    fetchImages()
  }, [propertyId])

  if (loading) return <div>Yükleniyor...</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt={`Property ${index + 1}`}
          width={400}
          height={300}
          className="object-cover rounded"
        />
      ))}
    </div>
  )
}
```

---

### Yöntem 3: Tüm Property'leri ve Resimlerini Çek (ÖNERİLEN)

Tüm property'leri ve tüm bilgilerini (status, year, progress, city, district, images) çekmek için:

```typescript
// lib/bayhan-properties.ts

const BAYHAN_API_URL = process.env.BAYHAN_API_URL || 'https://bayhan.tech'

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
  images: string[] // Tam URL'ler
}

export async function getBrewProperties(): Promise<BrewProperty[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    // Token varsa ekle (opsiyonel)
    if (process.env.BAYHAN_API_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.BAYHAN_API_TOKEN}`
    }
    
    const response = await fetch(
      `${BAYHAN_API_URL}/api/properties`,
      { headers }
    )
    
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
```

**Kullanım:**
```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBrewProperties, type BrewProperty } from '@/lib/bayhan-properties'

export function BrewPropertiesList() {
  const [properties, setProperties] = useState<BrewProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getBrewProperties()
      setProperties(data)
      setLoading(false)
    }
    fetchProperties()
  }, [])

  if (loading) return <div>Yükleniyor...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-2">
            {property.city} / {property.district}
          </p>
          {property.status === 'ongoing' && property.progress && (
            <p className="text-blue-600 mb-2">%{property.progress} Tamamlandı</p>
          )}
          {property.status === 'completed' && property.year && (
            <p className="text-green-600 mb-2">{property.year} Yılında Tamamlandı</p>
          )}
          
          {property.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {property.images.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`${property.title} - ${index + 1}`}
                  width={300}
                  height={200}
                  className="object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## 🔗 API Endpoint'leri

### 1. Tüm Property'leri Çek (ÖNERİLEN) ⭐

```
GET /api/properties
```

**Headers (Opsiyonel):**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response:**
```json
{
  "properties": [
    {
      "id": "abc-123-def",
      "title": "2024 - İstanbul / Kadıköy - Biten İnşaat",
      "description": "2024 yılında tamamlanan inşaat projesi - İstanbul / Kadıköy",
      "status": "completed",
      "year": 2024,
      "progress": null,
      "city": "İstanbul",
      "district": "Kadıköy",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "images": [
        "https://bayhan.tech/api/images/properties/abc-123-def/1234567890-xyz.jpg",
        "https://bayhan.tech/api/images/properties/abc-123-def/1234567891-abc.jpg"
      ]
    },
    {
      "id": "xyz-456-ghi",
      "title": "%75 - İzmir / Konak - Devam Eden İnşaat",
      "description": "%75 tamamlanmış inşaat projesi - İzmir / Konak",
      "status": "ongoing",
      "year": null,
      "progress": 75,
      "city": "İzmir",
      "district": "Konak",
      "createdAt": "2024-01-20T14:20:00.000Z",
      "images": [
        "https://bayhan.tech/api/images/properties/xyz-456-ghi/1234567892-def.jpg"
      ]
    }
  ],
  "count": 2
}
```

**Özellikler:**
- ✅ Tüm property bilgileri (status, year, progress, city, district)
- ✅ Her property için resim URL'leri (tam URL)
- ✅ CORS desteği
- ✅ Opsiyonel token authentication

---

### 2. Resim Servis Etme
```
GET /api/images/properties/{propertyId}/{fileName}
```

**Örnek:**
```
GET https://bayhan.tech/api/images/properties/abc-123-def/1234567890-xyz.jpg
```

**Response:** Image file (binary)

---

### 3. Resim Listesi (Public)
```
GET /api/images/public/properties/{propertyId}
```

**Headers (Opsiyonel):**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "images": [
    "https://bayhan.tech/api/images/properties/abc-123-def/1234567890-xyz.jpg",
    "https://bayhan.tech/api/images/properties/abc-123-def/1234567891-abc.jpg"
  ],
  "count": 2
}
```

---

## ⚙️ Next.js Konfigürasyonu

`next.config.ts` dosyasına ekle:

```typescript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bayhan.tech',
        pathname: '/api/images/**',
      },
    ],
  },
}
```

---

## 🔐 Güvenlik

### Environment Variables

`.env.local` dosyasına ekle:

```env
BAYHAN_API_URL="https://bayhan.tech"
BAYHAN_API_TOKEN="your-token-here" # Opsiyonel
```

### CORS

Eğer farklı bir domain'den erişiyorsanız, BayhanTech projesinde `.env` dosyasına:

```env
ALLOWED_ORIGIN="https://your-brew-site.com"
```

---

## 📝 Örnek: Tam Entegrasyon (Güncel)

```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBrewProperties, type BrewProperty } from '@/lib/bayhan-properties'

export function BrewPropertiesPage() {
  const [properties, setProperties] = useState<BrewProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getBrewProperties()
      setProperties(data)
      setLoading(false)
    }
    fetchProperties()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Emlak İlanları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
            {/* İlk Resim */}
            {property.images.length > 0 && (
              <div className="relative h-48 w-full">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{property.title}</h3>
              
              <p className="text-gray-600 mb-2">
                📍 {property.city} / {property.district}
              </p>
              
              {/* Durum Bilgisi */}
              {property.status === 'ongoing' && property.progress !== null && (
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    🔨 Devam Ediyor - %{property.progress}
                  </span>
                </div>
              )}
              
              {property.status === 'completed' && property.year !== null && (
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ✅ {property.year} Yılında Tamamlandı
                  </span>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                {property.description}
              </p>
              
              {/* Tüm Resimler */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {property.images.slice(1).map((url, index) => (
                    <div key={index} className="relative h-20 w-full">
                      <Image
                        src={url}
                        alt={`${property.title} - ${index + 2}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {properties.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Henüz emlak ilanı bulunmuyor.
        </div>
      )}
    </div>
  )
}
```

---

## ✅ Checklist

- [ ] `.env.local` dosyasına `BAYHAN_API_URL` eklendi
- [ ] `.env.local` dosyasına `BAYHAN_API_TOKEN` eklendi (opsiyonel)
- [ ] `next.config.ts`'de external domain eklendi
- [ ] `lib/bayhan-properties.ts` oluşturuldu
- [ ] `getBrewProperties()` fonksiyonu kullanılıyor
- [ ] Component'lerde property bilgileri (status, year, progress, city, district) gösteriliyor
- [ ] Component'lerde resim URL'leri kullanılıyor
- [ ] CORS ayarları yapıldı (gerekirse)

---

## 🆘 Sorun Giderme

### Resimler görünmüyor
- `BAYHAN_API_URL` doğru mu kontrol et
- `next.config.ts`'de `remotePatterns` eklendi mi kontrol et
- Browser console'da CORS hatası var mı kontrol et

### 401 Unauthorized
- Token gerekli mi kontrol et
- Token doğru mu kontrol et

### 404 Not Found
- Property ID doğru mu kontrol et
- Dosya adı doğru mu kontrol et

---

## 📞 Destek

Sorun yaşarsanız, BayhanTech projesindeki `RESIM_PAYLASIM_REHBERI.md` dosyasına bakın.

