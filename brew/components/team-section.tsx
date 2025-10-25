"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Abdullah Yılmaz",
    title: "Genel Müdür",
    image: "/abdullah_yilmaz.png",
  },
  {
    name: "Osman Yaşar",
    title: "Gayrimenkul ve Yatırım Danışmanı",
    image: "/osman_yasar.png",
  },
  {
    name: "Yavuzhan Şahin",
    title: "Gayrimenkul Danışmanı ve Peyzaj Mimarı",
    image: "/yavuzhan-sahin.jpg",
  },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Ekibimiz</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Alanında uzman, deneyimli ve profesyonel kadromuz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group border-2 hover:border-primary transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl pt-0"
              style={{
                transform: "perspective(1000px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative h-80 overflow-hidden rounded-t-lg">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-2 text-balance">{member.name}</h3>
                  <p className="text-sm text-white/90 text-balance">{member.title}</p>
                </div>
              </div>
              <CardContent className="p-6 bg-card">
                <div className="h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
