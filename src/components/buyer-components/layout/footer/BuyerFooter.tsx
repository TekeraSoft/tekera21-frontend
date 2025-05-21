import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function BuyerFooter() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Tekera21 Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">Tekera21</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Tekera21, modern ve kaliteli t-shirt tasarımları sunan bir
              e-ticaret markasıdır. Benzersiz tasarımlarımızla tarzınızı
              yansıtın.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/urunler?kategori=erkek"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Erkek T-Shirtler
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler?kategori=kadin"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Kadın T-Shirtler
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler?kategori=unisex"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Unisex T-Shirtler
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler?kategori=yeni"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Yeni Gelenler
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                <span className="text-gray-600">
                  Atatürk Cad. No:123, 34000 İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600">+90 212 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600">info@tekera21.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Tekera21. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/gizlilik-politikasi"
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-sartlari"
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/iade-politikasi"
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
              >
                İade Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
