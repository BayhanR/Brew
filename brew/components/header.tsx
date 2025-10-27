"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function Header() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/#ana-sayfa", label: "Ana Sayfa" },
    { href: "/#hizmetler", label: "Hizmetler" },
    { href: "/projeler", label: "Projeler" },
    { href: "/#iletisim", label: "İletişim" },
  ]

  if (!mounted) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={`${basePath}/images/brew-logo.png`}
              alt="BREW Gayrimenkul A.Ş."
              width={320}
              height={90}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Partner Logos & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
              <a
                href="https://www.sahibinden.com/emlak/izmir-kemalpasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahibinden sayfamız"
              >
                <Image
                  src={`${basePath}/images/sahibinden-logo.png`}
                  alt="Sahibinden"
                  width={80}
                  height={24}
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
              <div className="w-px h-6 bg-border" />
              <a
                href="https://www.hepsiemlak.com/emlak-ofisi/brew-gayrimenkul-151871?consultant=noconsultant"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hepsiemlak sayfamız"
              >
                <Image
                  src={`${basePath}/images/hepsiemlak-logo.png`}
                  alt="Hepsiemlak"
                  width={80}
                  height={24}
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t">
              <a
                href="https://www.sahibinden.com/emlak/izmir-kemalpasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahibinden sayfamız"
              >
                <Image
                  src={`${basePath}/images/sahibinden-logo.png`}
                  alt="Sahibinden"
                  width={60}
                  height={18}
                  className="h-5 w-auto opacity-70"
                />
              </a>
              <a
                href="https://www.hepsiemlak.com/emlak-ofisi/brew-gayrimenkul-151871?consultant=noconsultant"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hepsiemlak sayfamız"
              >
                <Image
                  src={`${basePath}/images/hepsiemlak-logo.png`}
                  alt="Hepsiemlak"
                  width={60}
                  height={18}
                  className="h-5 w-auto opacity-70"
                />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
