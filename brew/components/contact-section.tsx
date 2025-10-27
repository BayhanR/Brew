"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Linkedin, Instagram, MessageCircle } from "lucide-react"

export function ContactSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    hp: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`${basePath}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setResult({ ok: false, message: "Form gönderilemedi. Lütfen bilgilerinizi kontrol edin." })
        return
      }
      setResult({ ok: true, message: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz." })
      setFormData({ name: "", email: "", message: "", phone: "", hp: "" })
    } catch {
      setResult({ ok: false, message: "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="iletisim" className="py-12 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">İletişim</h2>
          <p className="text-lg text-muted-foreground text-balance">Projeleriniz için bizimle iletişime geçin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp}
                  onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                  className="hidden"
                />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Ad Soyad
                  </label>
                  <Input
                    id="name"
                    placeholder="Adınız ve soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    E-posta
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+90 (5XX) XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    Mesajınız
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                {result && (
                  <p
                    className={result.ok ? "text-green-600 text-sm" : "text-red-600 text-sm"}
                    aria-live="polite"
                  >
                    {result.message}
                  </p>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+90 (532) 493 98 01</p>
                    <p className="text-muted-foreground">+90 (506) 128 67 87</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-posta</h3>
                    <p className="text-muted-foreground">brewgayrimenkul@gmail.com</p>
{/*                     <p className="text-muted-foreground">info@brewgayrimenkul.com</p>
                    <p className="text-muted-foreground">satis@brewgayrimenkul.com</p> */}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-muted-foreground">
                      Kirazlı Caddesi 128 / B
                      <br />
                      Kemalpaşa , İzmir
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Sosyal Medya</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.instagram.com/brewgayrimenkul?igsh=MTE0ejQzNTRldWV1Mg==" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                  </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://wa.me/905061286787" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden p-0">
              <div className="h-64 lg:h-80 bg-muted relative rounded-t-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.227584926121!2d27.418845299999994!3d38.4302023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97136334b5b8f%3A0xdfa712c98db8f5b9!2sBREW%20GAYR%C4%B0MENKUL!5e1!3m2!1str!2str!4v1761407836524!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
