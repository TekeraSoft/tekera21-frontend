"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useAppSelector } from "@/store/store";
import DigitalFashionHeading from "../../utils/DigitalFashionHeading";
import { Twitter, Facebook, Instagram } from "lucide-react";

export default function DigitalFashionBuyerFooter() {
  const { logoUrl, tekeraAddress, tekeraEmail, tekeraPhone, socialLinks } =
    useAppSelector((state) => state.globalSettings);

  const iconMap: Record<string, React.ElementType> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
  };
  const quickLinks = [
    { label: "Anasayfa", href: "/" },
    { label: "Tüm Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/digital-fashion" className="flex items-center mb-4">
              <Image
                src={logoUrl}
                alt="Tekera21 Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-primary">Tekera21</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Tekera21, modern ve kaliteli t-shirt tasarımları sunan bir
              e-ticaret markasıdır. Benzersiz tasarımlarımızla tarzınızı
              yansıtın.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <Link
                    key={link.href}
                    target="_blank"
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <DigitalFashionHeading
              as="h2"
              size="text-lg md:text-xl"
              align="text-left"
              variant="default"
            >
              Hızlı Bağlantılar
            </DigitalFashionHeading>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full md:max-w-md">
            <DigitalFashionHeading
              as="h2"
              size="text-lg md:text-xl"
              align="text-left"
              variant="default"
            >
              İletişim
            </DigitalFashionHeading>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="min-w-8 min-h-10 text-primary mt-1" />
                  <span className="text-gray-600 text-sm leading-relaxed">
                    {tekeraAddress}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="min-w-8 min-h-10 text-primary mt-0.5" />
                  <span className="text-gray-600 text-sm break-all">
                    {tekeraPhone}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="min-w-8 min-h-10  text-primary mt-0.5" />
                  <span className=" text-gray-600 text-sm break-all">
                    {tekeraEmail}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0 font-semibold">
              &copy; {new Date().getFullYear()} Tekera21. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/gizlilik-politikasi"
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-sartlari"
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/iade-politikasi"
                className="text-gray-600 hover:text-primary transition-colors text-sm"
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
