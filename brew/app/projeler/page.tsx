"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const completedProjects = [
  {
    title: "Lüks Rezidans Projesi",
    location: "İstanbul, Kadıköy",
    image: "/bitmis1.jpeg",
    units: "48 Daire",
    year: "2023",
    description: "Modern mimarisi ve lüks yaşam alanlarıyla öne çıkan prestijli konut projesi.",
  },
  {
    title: "Modern Yaşam Kompleksi",
    location: "Ankara, Çankaya",
    image: "/bitmis2.jpeg",
    units: "72 Daire",
    year: "2022",
    description: "Sosyal donatı alanları ve akıllı ev sistemleriyle donatılmış modern kompleks.",
  },
  {
    title: "Prestij Konutları",
    location: "İzmir, Bornova",
    image: "/bitmis1.jpeg",
    units: "36 Daire",
    year: "2023",
    description: "Deniz manzaralı, geniş teraslı lüks konutlar.",
  },
]

const activeProjects = [
  {
    title: "Yeni Nesil Yaşam Alanları",
    location: "İstanbul, Ataşehir",
    image: "/bitmemis1.jpeg",
    units: "96 Daire",
    completion: "%65",
    description: "Akıllı şehir konseptiyle tasarlanan, çevre dostu yeşil bina sertifikalı proje.",
  },
  {
    title: "Bahçeşehir Rezidans",
    location: "İstanbul, Bahçeşehir",
    image: "/bitmemis2.jpeg",
    units: "54 Daire",
    completion: "%40",
    description: "Geniş yeşil alanlar ve sosyal tesislerle donatılmış aile dostu proje.",
  },
  {
    title: "Akıllı Ev Konsepti",
    location: "Bursa, Nilüfer",
    image: "/bitmemis3.jpeg",
    units: "32 Daire",
    completion: "%80",
    description: "Tam otomasyon sistemli, enerji tasarruflu akıllı konutlar.",
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all")

  const filteredProjects =
    filter === "all"
      ? [...completedProjects, ...activeProjects]
      : filter === "completed"
        ? completedProjects
        : activeProjects

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Tüm Projelerimiz</h1>
            <p className="text-lg text-muted-foreground text-balance max-w-3xl">
              BREW Gayrimenkul A.Ş. olarak tamamladığımız ve devam eden tüm projelerimizi keşfedin.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              Tüm Projeler
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className="rounded-full"
            >
              Biten Projeler
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
              className="rounded-full"
            >
              Aktif Projeler
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 pt-0 pb-0">
                <div className="relative h-72 overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary">
                      {"year" in project ? `Tamamlandı ${project.year}` : `Devam Ediyor ${project.completion}`}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-balance">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{project.units}</span>
                    <Badge variant="outline">{"year" in project ? project.year : project.completion}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
