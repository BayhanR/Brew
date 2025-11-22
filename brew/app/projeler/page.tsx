"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getBrewProperties, type BrewProperty } from "@/lib/bayhan-properties"
import { toBrewProxyUrl } from "@/lib/bayhan-images"

type UiProject = {
  title: string
  location: string
  image: string
  year?: string
  completion?: string
  units?: string
  description?: string
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all")
  const [allProjects, setAllProjects] = useState<UiProject[]>([])

  useEffect(() => {
    const load = async () => {
      const props = await getBrewProperties()
      const mapped: UiProject[] = props.map((p) => ({
        title: p.title,
        location: [p.city, p.district].filter(Boolean).join(", "),
        image: p.images?.[0] ? toBrewProxyUrl(p.images[0]) : "/modern-building-construction.png",
        year: p.status === "completed" && p.year ? String(p.year) : undefined,
        completion: p.status === "ongoing" && p.progress !== null ? `%${p.progress}` : undefined,
        description: p.description,
      }))
      setAllProjects(mapped)
    }
    load()
  }, [])

  const filteredProjects = allProjects.filter((p) => {
    if (filter === "all") return true
    if (filter === "completed") return Boolean(p.year)
    return Boolean(p.completion)
  })

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
                      {project.year ? `Tamamlandı ${project.year}` : `Devam Ediyor ${project.completion}`}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-balance">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{project.units}</span>
                    <Badge variant="outline">{project.year ? project.year : project.completion}</Badge>
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
