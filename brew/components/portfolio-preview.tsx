"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Lüks Rezidans Projesi",
    location: "İstanbul, Kadıköy",
    image: "/completed-luxury-residential-building.jpg",
    status: "Bitti",
    year: "2023",
  },
  {
    title: "Yeni Nesil Yaşam Alanları",
    location: "İstanbul, Ataşehir",
    image: "/modern-building-construction.png",
    status: "Aktif",
    completion: "%65",
  },
  {
    title: "Modern Yaşam Kompleksi",
    location: "Ankara, Çankaya",
    image: "/modern-apartment-complex-completed.jpg",
    status: "Bitti",
    year: "2022",
  },
  {
    title: "Bahçeşehir Rezidans",
    location: "İstanbul, Bahçeşehir",
    image: "/residential-construction-progress.jpg",
    status: "Aktif",
    completion: "%40",
  },
  {
    title: "Prestij Konutları",
    location: "İzmir, Bornova",
    image: "/prestigious-residential-towers.jpg",
    status: "Bitti",
    year: "2023",
  },
  {
    title: "Akıllı Ev Konsepti",
    location: "Bursa, Nilüfer",
    image: "/smart-home-construction-project.jpg",
    status: "Aktif",
    completion: "%80",
  },
]

export function PortfolioPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const getVisibleProjects = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(projects[(currentIndex + i) % projects.length])
    }
    return visible
  }

  return (
    <section id="projeler" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Projelerimiz</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Tamamladığımız ve devam eden prestijli projelerimiz
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleProjects().map((project, index) => (
              <Link href="/projeler" key={`${project.title}-${index}`} aria-label={`Projeler sayfası: ${project.title}`}>
                <Card
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 cursor-pointer pt-0 pb-0"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "600ms",
                  }}
                >
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Badge className="mb-2 bg-primary">
                          {project.status === "Bitti"
                            ? `Tamamlandı ${project.year}`
                            : `Devam Ediyor ${project.completion}`}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-white/80">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                    <Badge variant={project.status === "Bitti" ? "outline" : "default"}>
                      {project.status === "Bitti" ? project.year : project.completion}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Button asChild size="lg" className="group">
              <Link href="/projeler">
                Projelerimizi Görün
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
