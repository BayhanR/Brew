"use client"

import { Building, Home, Key, TrendingUp, Landmark, Handshake, Leaf, Ruler, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Building,
    title: "Kat Karşılığı Daire",
    description: "Arsa sahipleri için en avantajlı kat karşılığı inşaat projeleri.",
  },
  {
    icon: Handshake,
    title: "Müteahhitlik Hizmetleri",
    description: "A'dan Z'ye profesyonel inşaat ve müteahhitlik çözümleri.",
  },
  {
    icon: Home,
    title: "Emlakçılık",
    description: "Güvenilir ve profesyonel gayrimenkul danışmanlığı hizmetleri.",
  },
  {
    icon: Key,
    title: "Kiralık / Satılık Daireler",
    description: "Geniş portföyümüzden size uygun konut seçenekleri.",
  },
  {
    icon: TrendingUp,
    title: "Yatırım Fırsatları",
    description: "Karlı gayrimenkul yatırım projeleri ve danışmanlık.",
  },
  {
    icon: Landmark,
    title: "Arsa ve Tarla",
    description: "İmar durumlu arsa ve tarla alım-satım hizmetleri.",
  },
  {
    icon: Leaf,
    title: "Peyzaj Mimarlığı",
    description: "Bahçe, site ve proje çevre düzenleme ile uygulama hizmetleri.",
  },
  {
    icon: Ruler,
    title: "Mimarlık",
    description: "Konseptten uygulamaya mimari proje tasarımı ve danışmanlık.",
  },
  {
    icon: Palette,
    title: "İç Mimarlık & Tasarım",
    description: "Mekan tasarımı, 3D görselleştirme ve anahtar teslim uygulama.",
  },
]

export function ServicesSection() {
  return (
    <section id="hizmetler" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Hizmetlerimiz</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Gayrimenkul sektöründe kapsamlı ve profesyonel çözümler sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-border/50"
            >
              <CardContent className="p-8">
                <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
