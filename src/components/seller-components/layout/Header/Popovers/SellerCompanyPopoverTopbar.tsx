"use client";

import { logOut } from "@/app/actions";
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
import { useAppSelector } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MenuItem {
  label: string;
  href: string;
}

export default function SellerCompanyPopoverTopbar() {
  const { SellerCompanyInfo } = useAppSelector((state) => state.SellerCompany);
  const { logoUrl } = useAppSelector((state) => state.globalSettings);

  const menuItems: MenuItem[] = [
    { label: "Mağaza Bilgileri", href: "/seller/company" },
    { label: "Kullanıcı Yönetimi", href: "/kullanicilar" },
    { label: "Ticari Şartlar", href: "/sartlar" },
    { label: "Platform Kuralları", href: "/kurallar" },
  ];

  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setOpenDialog(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 text-xs cursor-pointer transition-all duration-300 border  mx-3 px-2 py-0.5 rounded-md border-black">
          {SellerCompanyInfo?.name}
          <ChevronDown size={16} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-4 shadow-lg rounded-lg bg-white z-[999]">
        <div className="flex items-center gap-4 border-b pb-4">
          <Image src={logoUrl} alt="Logo" width={48} height={48} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {SellerCompanyInfo?.name}
            </h3>
            <p className="text-sm text-gray-500">
              Puan: {SellerCompanyInfo?.score} | ID: #{SellerCompanyInfo?.id}
            </p>
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
