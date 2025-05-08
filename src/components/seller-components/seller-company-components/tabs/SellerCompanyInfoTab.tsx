"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, ChevronDown, ChevronUp, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompanyInfoTab() {
  const [editingCompanyName, setEditingCompanyName] = useState(false);
  const [editingKepAddress, setEditingKepAddress] = useState(false);
  const [editingMersisNo, setEditingMersisNo] = useState(false);
  const [editingIban, setEditingIban] = useState(false);
  const [showActivityCodes, setShowActivityCodes] = useState(false);
  const [showRepresentative, setShowRepresentative] = useState(true);
  const [showOwner, setShowOwner] = useState(true);

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

        <div className="mt-6">
          <button
            className="flex items-center justify-between w-full p-3 border rounded-md hover:bg-gray-50"
            onClick={() => setShowActivityCodes(!showActivityCodes)}
          >
            <span className="font-medium">Faaliyet Kodları</span>
            {showActivityCodes ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Temsilci</h3>
            <button className="text-purple-600 text-sm flex items-center gap-1">
              <Info className="h-4 w-4" />
              Temsilci Bilgilerimi Nasıl Beyan Ederim?
            </button>
          </div>
          <button onClick={() => setShowRepresentative(!showRepresentative)}>
            {showRepresentative ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>

        {showRepresentative && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              5549 sayılı Kanun başta olmak üzere ilgili mevzuat hükümleri
              dahilinde Temsile Yetkili Kişiyi; diğer bir deyişle, tüzel
              kişiliği yasal anlamda temsil etme yetkisine sahip olan kişi(ler)i
              ifade eder.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-800">
                32763 sayılı Resmi Gazete'de yayımlanan yönetmelik gereğince, bu
                ekranda yer alan bilgileri doldurarak beyan etmeniz ve gerekli
                doğrulama adımlarını tamamlamanız gerekmektedir.
              </p>
            </div>

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
                    <Pencil className="h-4 w-4 text-orange-500" />
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

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className="text-sm">
                Tüm temsilcileri ekledikten sonra beyanı tamamlayabilirsiniz.
              </span>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Beyan Yapılması Gereken Kişi Sayısını Göster
            </Button>
          </>
        )}
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">
              Gerçek Kişi Ortak/Nihai Kontrol Sahibi
            </h3>
            <button className="text-purple-600 text-sm flex items-center gap-1">
              <Info className="h-4 w-4" />
              Gerçek Kişi Ortak/Nihai Kontrol Sahibi Bilgilerimi Nasıl Beyan
              Ederim?
            </button>
          </div>
          <button onClick={() => setShowOwner(!showOwner)}>
            {showOwner ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>

        {showOwner && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              5549 sayılı Kanun başta olmak üzere ilgili mevzuat hükümleri
              dahilinde Gerçek Kişi Faydalanıcı'yı; diğer bir deyişle, tüzel
              kişiliğin yüzde yirmibesi aşan hissesine sahip gerçek kişi
              ortakları veya üst düzey yönetici sıfatıyla tüzel kişiliği nihai
              olarak kontrolünde bulunduran gerçek kişi(ler)i ifade eder.
            </p>

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
                    <Pencil className="h-4 w-4 text-orange-500" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-normal">Kişi Türü</Label>
                <Select defaultValue="tuzel-kisi">
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuzel-kisi">Tüzel Kişi</SelectItem>
                    <SelectItem value="gercek-kisi">Gerçek Kişi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-normal">VKN</Label>
                <Input placeholder="VKN girin" />
              </div>
              <div>
                <Label className="text-sm font-normal">Pay Oranı (%)</Label>
                <Input placeholder="Pay Oranı (%) Girin" />
                <p className="text-xs text-gray-500 mt-1">
                  %25'ten daha küçük pay oranına sahip kişileri bildirmenize
                  gerek yoktur.
                </p>
              </div>
            </div>

            <Button variant="outline" className="mb-4">
              Sorgula
            </Button>

            <Button variant="outline" className="flex items-center gap-2">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              Yeni Kişi Ekle
            </Button>
          </>
        )}
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
          bilgilerinizin Trendyol'da da güncellenmesini sağlayabilirsiniz.
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

        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Güncelle
        </Button>
      </div>
    </div>
  );
}
