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

    // Resend e-posta bildirimi (env varsa)
    try {
      const apiKey = process.env.RESEND_API_KEY
      const to = process.env.RESEND_TO
      const from = process.env.RESEND_FROM
      if (apiKey && to && from) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            subject: `Yeni iletişim talebi - ${name}`,
            html: `
              <h2>Yeni İletişim Talebi</h2>
              <p><strong>Ad Soyad:</strong> ${name}</p>
              <p><strong>E-posta:</strong> ${email}</p>
              <p><strong>Telefon:</strong> ${phone}</p>
              <p><strong>Mesaj:</strong><br/>${escapeHtml(message)}</p>
            `,
          }),
        })
      }
    } catch (e) {
      console.warn("Resend e-posta gönderimi atlandı:", (e as Error)?.message)
    }

    // Google Sheets'e yaz (bayrak açıksa) - googleapis kurulu değilse sessizce geçer
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

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


