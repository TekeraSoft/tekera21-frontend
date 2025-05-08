"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { RootState } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SellerCompanyPopoverTopbar() {
  interface MenuItem {
    label: string;
    href: string;
  }

  const menuItems: MenuItem[] = [
    { label: "Hesap Bilgileri", href: "/hesap" },
    { label: "Kullanıcı Yönetimi", href: "/kullanicilar" },
    { label: "Ticari Şartlar", href: "/sartlar" },
    { label: "Platform Kuralları", href: "/kurallar" },
  ];

  const [openDialog, setOpenDialog] = useState(false);

  const { logoUrl } = useSelector((state: RootState) => state.globalSettings);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer transition-all duration-300 border  mx-3 px-2 py-0.5 rounded-md border-black">
          Mağaza Adı <ChevronDown size={16} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-4 shadow-lg rounded-lg bg-white">
        <div className="flex items-center gap-4 border-b pb-4">
          <Image src={logoUrl} alt="Logo" width={48} height={48} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Mağaza Adı</h3>
            <p className="text-sm text-gray-500">Puan: 4.8 | ID: #12345</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-800">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block hover:underline transition-all duration-200"
            >
              {item.label}
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
              <p>Emin misiniz? Oturumu kapatmak üzeresiniz.</p>
              <DialogFooter className="mt-4 flex flex-col gap-3">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Hayır
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpenDialog(false);
                    // logout işlemi yapılabilir
                  }}
                >
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
