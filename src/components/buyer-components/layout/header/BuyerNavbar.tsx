"use client";

import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import BuyerLangChangeButton from "./BuyerLangChangeButton";
import { Menu, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BuyerCartSideBar from "./BuyerCartSideBar";

export default function BuyerNavbar() {
  const { logoUrl } = useAppSelector((state) => state.globalSettings);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Ekran genişliği değişimini dinle
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsSheetOpen(false); // Geniş ekran olunca sheet kapat
      }
    }

    window.addEventListener("resize", handleResize);

    // Component mount anında da kontrol et
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Tüm Ürünler", path: "/all-products" },
    { name: "Hakkımızda", path: "/about-us" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <div className="w-full border-b">
      <div className="container mx-auto ">
        <div className="flex  items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt="Tekera21 Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-primary">Tekera21</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <BuyerLangChangeButton />
            <Button variant={"primary"}>
              <Link href="/login">Üye Ol</Link>
            </Button>
            <Link href="/sepet" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu - Sheet */}
          <div className="flex justify-center items-center gap-4 md:hidden">
            <BuyerCartSideBar />

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button>
                  <Menu className="h-8 w-8  cursor-pointer border border-black rounded-sm" />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72 sm:w-80 ">
                <SheetHeader>
                  <SheetTitle className="border-b">Menü</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  {NavLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="text-gray-700 hover:text-white hover:bg-primary px-2 transition-colors rounded-md py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <hr className="mt-1" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
