import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import SellerAnnouncementPopover from "./SellerAnnouncementPopover";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NavItem {
  label: string;
  href?: string;
  target?: string;
}

const leftLinks: NavItem[] = [
  { label: "Satıcı Paneli", href: "/seller", target: "_blank" },
  { label: "Satıcı Bilgi Merkezi", href: "/sellet", target: "_blank" },
  { label: "Tekera21 Akademi", href: "/sellet", target: "_blank" },
  { label: "Entegrasyon Dökümanı", href: "/sellet", target: "_blank" },
];

interface AlertItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "error" | "warning" | "success";
}

const alertItems: AlertItem[] = [
  {
    id: "1",
    title: "Yeni Sipariş",
    message: "Bir müşteri yeni bir sipariş verdi.",
    type: "success",
  },
  {
    id: "2",
    title: "Stok Uyarısı",
    message: "Stokta azalan ürünler var.",
    type: "warning",
  },
];

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

function Topbar() {
  const [openDialog, setOpenDialog] = useState(false);

  const { logoUrl } = useSelector((state: RootState) => state.globalSettings);

  return (
    <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 border-b text-sm bg-gray-100 gap-2">
      {/* Left Nav */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {leftLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            target={item.target}
            className="hover:underline text-primary transition-all duration-300 ease-in-out hover:text-secondary"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-4 relative">
        <SellerAnnouncementPopover alertItems={alertItems} />

        <Link
          href="/seller"
          target="_blank"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300"
        >
          Destek
        </Link>

        <Link
          href="/seller/calendar"
          target="_blank"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300"
        >
          Takvim
        </Link>
        <Link
          href={"/shop/arzuamber"}
          className="text-gray-600 hover:text-blue-500 transition-all duration-300"
        >
          Mağazaya Git
        </Link>

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
                <h3 className="text-lg font-semibold text-gray-800">
                  Mağaza Adı
                </h3>
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
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                    >
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
      </div>
    </div>
  );
}

export default Topbar;
