import { NextResponse } from "next/server"
import { appendContactRow } from "@/lib/google-sheets"

function isNonEmptyString(value: unknown, min = 1, max = 2000) {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max
}

function isValidEmail(value: unknown) {
  if (typeof value !== "string") return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, hp } = body ?? {}

    const errors: Record<string, string> = {}
    if (!isNonEmptyString(name, 2, 100)) errors.name = "Ad Soyad geçersiz"
    if (!isValidEmail(email)) errors.email = "E-posta geçersiz"
    if (!isNonEmptyString(phone, 7, 30)) errors.phone = "Telefon geçersiz"
    if (!isNonEmptyString(message, 5, 2000)) errors.message = "Mesaj geçersiz"
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 })
    }

    // Basit honeypot kontrolü
    if (hp && hp.trim() !== "") {
      return NextResponse.json({ ok: true })
    }

    // Google Sheets'e yaz (env değişkenleri tanımlıysa)
    try {
      await appendContactRow({ name, email, phone, message })
    } catch (e) {
      console.warn("Google Sheets yazma atlandı:", (e as Error)?.message)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


