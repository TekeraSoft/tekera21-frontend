"use client";
import { useAppSelector } from "@/store/store";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SellerFooter = () => {
  const { logoUrl } = useAppSelector((state) => state.globalSettings);

  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
          )}
          <span className="text-lg font-semibold text-gray-700">
            Satıcı Paneli
          </span>
        </Link>

        {/* Linkler */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/help" className="hover:text-blue-600">
            Yardım
          </Link>
          <Link href="/terms" className="hover:text-blue-600">
            Şartlar
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            İletişim
          </Link>
        </div>

        {/* Sosyal Medya */}
        <div className="flex items-center gap-4 text-gray-600">
          <Link href="https://facebook.com" target="_blank">
            <Facebook className="w-5 h-5 hover:text-blue-600" />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <Twitter className="w-5 h-5 hover:text-blue-600" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Instagram className="w-5 h-5 hover:text-pink-500" />
          </Link>
        </div>
      </div>

      {/* Alt Satır */}
      <Separator className="my-4" />
      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default SellerFooter;
