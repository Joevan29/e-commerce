import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="font-bold text-xl">Premium</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Koleksi premium produk 3D berkualitas tinggi dengan teknologi terdepan untuk pengalaman berbelanja yang
              tak terlupakan.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Koleksi
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Teknologi
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Layanan Pelanggan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Garansi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@premium3d.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600 text-sm">Dapatkan update produk terbaru dan penawaran eksklusif.</p>
            <div className="space-y-2">
              <Input type="email" placeholder="Email Anda" className="bg-white border-gray-300" />
              <Button className="w-full bg-black hover:bg-gray-800 text-white">Berlangganan</Button>
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Jl. Sudirman No. 123, Jakarta Pusat, Indonesia 10220</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">© 2024 Premium 3D. Semua hak dilindungi.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
