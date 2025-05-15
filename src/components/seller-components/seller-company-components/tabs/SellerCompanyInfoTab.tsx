"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, ChevronDown } from "lucide-react";

export default function SelllerCompanyInfoTab() {
  const [editingCompanyName, setEditingCompanyName] = useState(false);
  const [editingKepAddress, setEditingKepAddress] = useState(false);
  const [editingMersisNo, setEditingMersisNo] = useState(false);
  const [editingIban, setEditingIban] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Şirketinize Ait Bilgiler</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-normal">Mağaza Adı</Label>
            <div className="mt-1 relative">
              <Input
                value="ARZUAMBER MODA"
                disabled={!editingCompanyName}
                className="pr-16"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingCompanyName(!editingCompanyName)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-normal">Satıcı ID (Cari ID)</Label>
            <div className="mt-1">
              <Input value="1110123" disabled className="bg-gray-50" />
            </div>
          </div>

          <div>
            <Label className="text-sm text-green-500 font-normal">
              KEP Adresi
            </Label>
            <div className="mt-1 relative">
              <Input
                value="arzuambermoda@hs09.kep.tr"
                disabled={!editingKepAddress}
                className="pr-16 border-green-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingKepAddress(!editingKepAddress)}
                >
                  {editingKepAddress ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                </Button>
                {editingKepAddress ? null : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm text-green-500 font-normal">
              Mersis No
            </Label>
            <div className="mt-1 relative">
              <Input
                value="0086-1698-3650-0001"
                disabled={!editingMersisNo}
                className="pr-16 border-green-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingMersisNo(!editingMersisNo)}
                >
                  {editingMersisNo ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                </Button>
                {editingMersisNo ? null : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-normal">IBAN Numarası</Label>
            <div className="mt-1 relative">
              <Input
                value="TR48 0001 0012 3697 9725 4650 01"
                disabled={!editingIban}
                className="pr-16"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingIban(!editingIban)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-2xl font-bold mb-5">Temsilci</h3>

        <div className="bg-gray-50 p-4 rounded-md border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-green-600 font-medium">Doğrulandı</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">TCKN/YKN</p>
              <p className="font-medium">9*********32</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vatandaşlık Seçimi</p>
              <p className="font-medium">Yabancı</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Kimlik Belgesi Türü</p>
              <p className="font-medium">Yabancı Kimlik Kartı</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                Kimlik Seri Numarası/Doküman No
              </p>
              <p className="font-medium">YA******41</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ad Soyad</p>
              <p className="font-medium">AR**** HO****************</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Tarihi</p>
              <p className="font-medium">1983-**-**</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Ülkesi</p>
              <p className="font-medium">İran</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Yeri</p>
              <p className="font-medium">Mashhad</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Uyruk</p>
              <p className="font-medium">İran</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">İş ve Meslek</p>
              <p className="font-medium">Tasarımcı</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-2xl font-bold mb-5">
          Gerçek Kişi Ortak/Nihai Kontrol Sahibi
        </h3>

        <div className="bg-gray-50 p-4 rounded-md border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-green-600 font-medium">Doğrulandı</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 " />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">TCKN/YKN</p>
              <p className="font-medium">9*********32</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vatandaşlık Seçimi</p>
              <p className="font-medium">Yabancı</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Kimlik Belgesi Türü</p>
              <p className="font-medium">Yabancı Kimlik Kartı</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                Kimlik Seri Numarası/Doküman No
              </p>
              <p className="font-medium">YA******41</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ad Soyad</p>
              <p className="font-medium">AR**** HO****************</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Tarihi</p>
              <p className="font-medium">1983-**-**</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Ülkesi</p>
              <p className="font-medium">İran</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Doğum Yeri</p>
              <p className="font-medium">Mashhad</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pay Oranı (%)</p>
              <p className="font-medium">100</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Adres</p>
              <p className="font-medium">
                SA********************************ya
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">
          Şirketinize Ait Gelir İdaresi Başkanlığı Kayıtları
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Aşağıdaki bilgileriniz Gelir İdaresi Başkanlığı aracılığı ile
          doğrulanmıştır. Hatalı olduğunu düşünüyorsanız{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Satıcı Destek Hattı
          </a>{" "}
          üzerinden bizimle iletişime geçebilirsiniz. Firma bilgileriniz Gelir
          İdaresi Başkanlığı'nda değişti ise{" "}
          <span className="font-medium">"Güncelle"</span> butonuna tıklayarak
          bilgilerinizin tekera21'da da güncellenmesini sağlayabilirsiniz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <Label className="text-sm font-normal">Vergi Dairesi</Label>
            <Input
              value="ANTALYA KURUMLAR VERGİ DAİRESİ MÜD."
              disabled
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-sm font-normal">
              Şirket Unvanı (Cari Unvanı)
            </Label>
            <Input
              value="ARZUAMBER MODA TİCARET VE SANAYİ LİMİTED ŞİRKETİ"
              disabled
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-sm font-normal">Vergi Numarası</Label>
            <Input value="08******85" disabled className="bg-gray-50" />
          </div>
          <div>
            <Label className="text-sm font-normal">Şirket Türü</Label>
            <Input value="Limited Şirketi" disabled className="bg-gray-50" />
          </div>
        </div>

        <Button className=" text-white">Güncelle</Button>
      </div>
    </div>
  );
}
