"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, SquarePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function SellerProductListTabsHeader() {
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  return (
    <div className="flex justify-between items-center mx-5 md:mx-0">
      <h1 className="text-2xl font-bold">Ürün Listesi</h1>
      <div className="flex gap-2">
        {/* Excel Download Button with Confirmation Dialog */}
        <Dialog
          open={showDownloadConfirm}
          onOpenChange={setShowDownloadConfirm}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Excel İle İndir
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Excel İle İndir</DialogTitle>
              <DialogDescription>
                İndirmek istediğinize emin misiniz?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2 flex flex-col gap-3 ">
              <Button
                variant="outline"
                onClick={() => setShowDownloadConfirm(false)}
              >
                İptal
              </Button>
              <Button
                onClick={() => {
                  // Download logic here
                  setShowDownloadConfirm(false);
                }}
              >
                İndir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex justify-center items-center gap-2"
              variant="default"
            >
              <SquarePlus />
              Ürün Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md md:max-w-2xl ">
            <DialogHeader>
              <DialogTitle className="mb-4">Ürün Ekle</DialogTitle>
            </DialogHeader>

            <Card className="flex flex-col md:flex-row justify-between items-center gap-4 border shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex-1">
                <CardTitle className="text-lg">Tekil Ürün Yükleyin</CardTitle>
                <CardDescription className="mt-2">
                  Az sayıda ürününüz varsa bilgilerini hızlıca doldurarak
                  ürünlerinizi ekleyebilirsiniz!
                </CardDescription>
                <div className="mt-4">
                  <Button>Hemen Yüklemeye Başla</Button>
                </div>
              </div>
              <div className="w-[150px] md:w-[200px] flex-shrink-0">
                <Image
                  src="https://fakeimg.pl/250x150"
                  alt="Tekil Ürün Yükle"
                  width={200}
                  height={150}
                  className="rounded object-contain w-full h-auto"
                />
              </div>
            </Card>

            {/* Excel ile Toplu Yükleyin */}
            <Card className="flex flex-col md:flex-row justify-between items-center gap-4 border shadow-sm hover:shadow-md transition-shadow p-4 mt-4">
              <div className="flex-1">
                <CardTitle className="text-lg">
                  Excel ile Toplu Yükleyin
                </CardTitle>
                <CardDescription className="mt-2">
                  Çok sayıda ürününüz varsa bilgilerini toplu halde
                  ekleyebilirsiniz!
                </CardDescription>
                <div className="mt-4">
                  <Button>Hemen Yüklemeye Başla</Button>
                </div>
              </div>
              <div className="w-[150px] md:w-[200px] flex-shrink-0">
                <Image
                  src="https://fakeimg.pl/250x150"
                  alt="Excel ile Toplu Yükle"
                  width={200}
                  height={150}
                  className="rounded object-contain w-full h-auto"
                />
              </div>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default SellerProductListTabsHeader;
