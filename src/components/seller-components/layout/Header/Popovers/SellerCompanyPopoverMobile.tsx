"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { logOut } from "@/app/actions";

interface PopoverLink {
  text: string;
  href: string;
}

export default function SellerCompanyPopover() {
  const { SellerCompanyInfo } = useAppSelector((state) => state.SellerCompany);
  const { logoUrl } = useAppSelector((state) => state.globalSettings);

  const [openDialog, setOpenDialog] = useState(false);

  const popoverLinks: PopoverLink[] = [
    { text: "Hesap Bilgileri", href: "/seller/company" },
    { text: "Kullanıcı Yönetimi", href: "/seller/users" },
    { text: "Ticari Şartlar", href: "/sartlar" },
    { text: "Platform Kuralları", href: "/kurallar" },
  ];

  const handleLogout = async () => {
    await logOut();
    setOpenDialog(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full"
          variant="default"
          size="icon"
          aria-label="Kullanıcı menüsü"
        >
          <Store size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 sm:w-96 p-4 lg:hidden z-50">
        <div className="flex items-center gap-4 border-b pb-4">
          <Link
            href={"/seller"}
            className="mr-4 flex items-center justify-center"
          >
            {/* Logo */}
            <Image
              src={logoUrl}
              alt="logo-url"
              width={50}
              height={50}
              className="object-cover"
            />
          </Link>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold truncate">
              {SellerCompanyInfo?.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              Puan: {SellerCompanyInfo?.score}| ID: #{SellerCompanyInfo?.id}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {popoverLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-800 hover:underline"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="pt-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setOpenDialog(true)}
              >
                Çıkış Yap
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-lg">
              <DialogHeader>
                <DialogTitle>Çıkış Yap</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-700">
                Emin misiniz? Oturumu kapatmak üzeresiniz.
              </p>
              <DialogFooter className="mt-4 flex flex-col gap-3">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Hayır
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Evet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
