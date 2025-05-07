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
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SellerUserPopover() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full"
          variant="default"
          size="icon"
          aria-label="Kullanıcı menüsü"
        >
          <UserRound size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 sm:w-96 p-4 lg:hidden">
        <div className="flex items-center gap-4 border-b pb-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
          <div className="min-w-0">
            <h3 className="text-lg font-semibold truncate">Mağaza Adı</h3>
            <p className="text-sm text-gray-500 truncate">
              Puan: 4.8 | ID: #12345
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <Link href="/hesap" className="block text-gray-800 hover:underline">
            Hesap Bilgileri
          </Link>
          <Link
            href="/kullanicilar"
            className="block text-gray-800 hover:underline"
          >
            Kullanıcı Yönetimi
          </Link>
          <Link href="/sartlar" className="block text-gray-800 hover:underline">
            Ticari Şartlar
          </Link>
          <Link
            href="/kurallar"
            className="block text-gray-800 hover:underline"
          >
            Platform Kuralları
          </Link>
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
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpenDialog(false);
                    // logout işlemi buraya yazılabilir
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
