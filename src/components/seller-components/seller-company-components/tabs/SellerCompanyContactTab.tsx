"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function SellerCompanyContactTab() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Adres Bilgileri</h2>
          <Button className=" text-white flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Adres Bilgisi Ekle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Adres 1 */}
          <Card className="overflow-hidden">
            <div className="bg-green-100 p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">1. Adres (Fatura)</span>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                  Varsayılan
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres ID</span>
                  <span className="text-sm">7637413</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">İl / İlçe</span>
                  <span className="text-sm">Antalya / Muratpaşa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Posta Kodu</span>
                  <span className="text-sm">07000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres</span>
                  <span className="text-sm text-right">
                    Mahalle/Semt: KIŞLA MAH. Cadde/Sokak: 40 SK. A BLOK KAYA APT
                    No:8 A İç Kapı No:7
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adres 2 */}
          <Card className="overflow-hidden">
            <div className="bg-gray-100 p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">2. Adres (Sevkiyat)</span>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                  Varsayılan
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 p-0 px-2  text-xs"
                >
                  Güncelle
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres ID</span>
                  <span className="text-sm">7643288</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">İl / İlçe</span>
                  <span className="text-sm">Antalya / Muratpaşa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Posta Kodu</span>
                  <span className="text-sm">07000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres</span>
                  <span className="text-sm text-right">
                    Mahalle/Semt: KIŞLA MAH. Cadde/Sokak: 40 SK. A BLOK KAYA APT
                    No:8 A İç Kapı No:7
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adres 3 */}
          <Card className="overflow-hidden">
            <div className="bg-gray-100 p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">3. Adres (İade)</span>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                  Varsayılan
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 p-0 px-2  text-xs"
                >
                  Güncelle
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>{" "}
                  butonu guncelle
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres ID</span>
                  <span className="text-sm">7643287</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">İl / İlçe</span>
                  <span className="text-sm">Antalya / Muratpaşa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Posta Kodu</span>
                  <span className="text-sm">07000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Adres</span>
                  <span className="text-sm text-right">
                    Mahalle/Semt: KIŞLA MAH. Cadde/Sokak: 40 SK. A BLOK KAYA APT
                    No:8 A İç Kapı No:7
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">İletişim Bilgileri</h2>
          <Button className=" text-white flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            İletişim Bilgisi Ekle
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-gray-100 p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium">1. İletişim Bilgisi</span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 p-0 px-2  text-xs">
              Güncelle
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">İletişim Türü</span>
                <span className="text-sm">Finans</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Ad Soyad</span>
                <span className="text-sm">Arezoo Hoosseini mousavi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">E-Posta</span>
                <span className="text-sm">arzuambermoda@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Telefon</span>
                <span className="text-sm">+90 53*****385</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Açıklama</span>
                <span className="text-sm">-</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
