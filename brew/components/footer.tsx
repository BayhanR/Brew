import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/#ana-sayfa", label: "Ana Sayfa" },
    { href: "/#hizmetler", label: "Hizmetler" },
    { href: "/projeler", label: "Projeler" },
    { href: "/#iletisim", label: "İletişim" },
  ]

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <Image
              src="/images/brew-logo.png"
              alt="BREW Gayrimenkul A.Ş."
            width={320}
            height={90}
            className="h-16 md:h-20 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Geleceğin yaşam alanlarını inşa eden, güvenilir ve profesyonel gayrimenkul çözüm ortağınız.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Logos */}
          <div>
            <h3 className="font-semibold mb-4">İş Ortaklarımız</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.sahibinden.com/emlak/izmir-kemalpasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahibinden sayfamız"
              >
                <Image
                  src="/images/sahibinden-logo.png"
                  alt="Sahibinden"
                  width={100}
                  height={30}
                  className="h-10 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </a>
              <a
                href="https://www.hepsiemlak.com/emlak-ofisi/brew-gayrimenkul-151871?consultant=noconsultant"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hepsiemlak sayfamız"
              >
                <Image
                  src="/images/hepsiemlak-logo.png"
                  alt="Hepsiemlak"
                  width={120}
                  height={30}
                  className="h-10 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BREW Gayrimenkul A.Ş. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by {" "}
            <Link
              href="https://bayhan.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              bayhan.tech
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
