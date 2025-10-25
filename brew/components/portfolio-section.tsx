"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const completedProjects = [
  {
    title: "Lüks Rezidans Projesi",
    location: "İstanbul, Kadıköy",
    image: "/completed-luxury-residential-building.jpg",
    units: "48 Daire",
    year: "2023",
  },
  {
    title: "Modern Yaşam Kompleksi",
    location: "Ankara, Çankaya",
    image: "/modern-apartment-complex-completed.jpg",
    units: "72 Daire",
    year: "2022",
  },
  {
    title: "Prestij Konutları",
    location: "İzmir, Bornova",
    image: "/prestigious-residential-towers.jpg",
    units: "36 Daire",
    year: "2023",
  },
]

const activeProjects = [
  {
    title: "Yeni Nesil Yaşam Alanları",
    location: "İstanbul, Ataşehir",
    image: "/modern-building-construction.png",
    units: "96 Daire",
    completion: "%65",
  },
  {
    title: "Bahçeşehir Rezidans",
    location: "İstanbul, Bahçeşehir",
    image: "/residential-construction-progress.jpg",
    units: "54 Daire",
    completion: "%40",
  },
  {
    title: "Akıllı Ev Konsepti",
    location: "Bursa, Nilüfer",
    image: "/smart-home-construction-project.jpg",
    units: "32 Daire",
    completion: "%80",
  },
    {
    title: "Akıllı Ev Konsepti",
    location: "Bursa, Nilüfer",
    image: "/smart-home-construction-project.jpg",
    units: "32 Daire",
    completion: "%80",
  }
]

export function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("completed")

  return (
    <section id="projeler" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Projelerimiz</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Tamamladığımız ve devam eden prestijli projelerimiz
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="completed" className="text-base">
              Biten Projeler
            </TabsTrigger>
            <TabsTrigger value="active" className="text-base">
              Aktif Projeler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Badge className="mb-2 bg-primary">Tamamlandı {project.year}</Badge>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-white/80">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{project.units}</span>
                      <Badge variant="outline">{project.year}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Badge className="mb-2 bg-primary">Devam Ediyor {project.completion}</Badge>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-white/80">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{project.units}</span>
                      <Badge variant="outline">{project.completion}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
