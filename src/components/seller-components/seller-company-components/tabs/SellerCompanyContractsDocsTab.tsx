"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Check, Eye } from "lucide-react";

export default function SellerContractsDocsTab() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          Elektronik Ticaret Aracı Hizmet Sağlayıcı ve Elektronik Ticaret Hizmet
          Sağlayıcılar Hakkında Yönetmelik'in 16. maddesi uyarınca DSM
          tarafından sözleşmede yapılan değişiklikler için iş ortaklarımıza
          önceden gerekli bildirimler yapılmaktadır. DSM tarafından daha uzun
          bir süre belirtilmediği durumda sözleşme değişiklikleri bildirim
          tarihinden itibaren 15 günlük sürenin sonunda uygulamaya konulur. Bu
          süre, mevzuatta öngörülen bazı hallerde 30 gündür. Bu düzenleme
          uyarınca sözleşme değişikliklerini içeren ve "Bilgilendirme" olarak
          adlandırılan belgeler, belirtilen yürürlük tarihinde yürürlüğe
          girecektir.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          30 veya daha uzun süre sonunda uygulamaya konulacak sözleşme
          değişikliklerinde, bu sürenin sona ermesinden önce Satıcı Destek Hattı
          üzerinden bildirimde bulunarak sözleşmeyi fesih bildiriminizin
          yapıldığı tarihten itibaren sonuç doğurmak üzere tazminatsız
          feshedebilirsiniz.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="approved">Onaylananlar</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 text-sm font-medium">
                    Sözleşme Adı
                  </th>
                  <th className="text-left p-3 text-sm font-medium">Durumu</th>
                  <th className="text-left p-3 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Yayımlanma Tarihi
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Son İşlem Tarihi
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    Aksiyonlar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm">Ek Protokol Bilgilendirmesi</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      Bilgilendirildi
                    </div>
                  </td>
                  <td className="p-3 text-sm">30 Nisan 2025 16:22</td>
                  <td className="p-3 text-sm">02 Mayıs 2025 11:09</td>
                  <td className="p-3 text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Görüntüle
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm">
                    Elektronik Ticaret Aracılık Sözleşmesi
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      Onaylandı
                    </div>
                  </td>
                  <td className="p-3 text-sm">19 Mart 2025 16:26</td>
                  <td className="p-3 text-sm">27 Mart 2025 14:41</td>
                  <td className="p-3 text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Görüntüle
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled
              >
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 bg-gray-800 text-white"
              >
                1
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 text-sm font-medium">
                    Sözleşme Adı
                  </th>
                  <th className="text-left p-3 text-sm font-medium">Durumu</th>
                  <th className="text-left p-3 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Yayımlanma Tarihi
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Son İşlem Tarihi
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    Aksiyonlar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm">
                    Elektronik Ticaret Aracılık Sözleşmesi
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      Onaylandı
                    </div>
                  </td>
                  <td className="p-3 text-sm">19 Mart 2025 16:26</td>
                  <td className="p-3 text-sm">27 Mart 2025 14:41</td>
                  <td className="p-3 text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Görüntüle
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
