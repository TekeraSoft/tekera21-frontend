"use client";

import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import DigitalFashionBuyerLangChangeButton from "./DigitalFashionBuyerLangChangeButton";
import DigitalFashionBuyerCartSideBar from "./DigitalFashionBuyerCartSideBar";
import DigitalFashionBuyerLoginRegisterPopover from "./DigitalFashionBuyerLoginRegisterPopover";

export default function DigitalFashionBuyerNavbar() {
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
    { name: "Anasayfa", path: "/digital-fashion" },
    { name: "Tüm Ürünler", path: "/digital-fashion/all-products" },
    { name: "Hakkımızda", path: "/digital-fashion/about-us" },
    { name: "İletişim", path: "/digital-fashion/contact" },
  ];

  return (
    <div className="w-full border-b">
      <div className="container mx-auto ">
        <div className="flex  items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/digital-fashion" className="flex items-center">
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
          <nav className="hidden lg:flex items-center space-x-8">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-700 hover:text-primary transition-colors font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <DigitalFashionBuyerLangChangeButton />
            <DigitalFashionBuyerCartSideBar />
            <DigitalFashionBuyerLoginRegisterPopover />
          </div>

          {/* Mobile Menu - Sheet */}
          <div className="flex justify-center items-center gap-3 lg:hidden">
            <DigitalFashionBuyerLoginRegisterPopover />

            <DigitalFashionBuyerCartSideBar />

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button>
                  <Menu
                    strokeWidth={2.5}
                    className="h-7 w-7 cursor-pointer border-2 border-black rounded-sm"
                  />
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
