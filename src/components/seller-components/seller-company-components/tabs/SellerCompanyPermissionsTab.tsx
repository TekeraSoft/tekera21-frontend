"use client";

import { Button } from "@/components/ui/button";
import { Info, Check, Eye } from "lucide-react";

export default function PermissionsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          "Görüntüle" butonuna tıklayıp, izinin detayını okuyarak onay/red
          işlemi yapabilir veya daha önce onay/red işlemi yaptığınız izinlerin
          tercih değişikliği bilgilerini bulabilirsiniz.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-3 text-sm font-medium">İzin Adı</th>
              <th className="text-left p-3 text-sm font-medium">Durumu</th>
              <th className="text-left p-3 text-sm font-medium">
                <div className="flex items-center gap-1">
                  Son İşlem Tarihi
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </th>
              <th className="text-left p-3 text-sm font-medium">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>
                    Tahmini Teslimat Tarihi Gösterim İzni - Tüm Mecralar
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Trendyol Talebi
                  </span>
                </div>
              </td>
              <td className="p-3 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  Onaylandı
                </div>
              </td>
              <td className="p-3 text-sm">12 Mart 2025 12:22</td>
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
                <div className="flex items-center gap-2">
                  <span>Termin Gösterim İzni</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Trendyol Talebi
                  </span>
                </div>
              </td>
              <td className="p-3 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  Onaylandı
                </div>
              </td>
              <td className="p-3 text-sm">12 Mart 2025 12:23</td>
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
                <div className="flex items-center gap-2">
                  <span>Tahmini Teslimat Süresi Gösterim İzni</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Trendyol Talebi
                  </span>
                </div>
              </td>
              <td className="p-3 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  Onaylandı
                </div>
              </td>
              <td className="p-3 text-sm">12 Mart 2025 12:23</td>
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
                <div className="flex items-center gap-2">
                  <span>
                    Trendyol Karşılamalı İndirim, Promosyon ve Kampanya
                    Uygulamaları İzni
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Trendyol Talebi
                  </span>
                </div>
              </td>
              <td className="p-3 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  Onaylandı
                </div>
              </td>
              <td className="p-3 text-sm">12 Mart 2025 12:23</td>
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
    </div>
  );
}
