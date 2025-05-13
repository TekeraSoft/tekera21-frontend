"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChangeCompanyModal from "./SellerCargoChangeCompanyModal";

export default function SellerCargoCompaniesTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Firma Adı
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Değişiklik Tarihi
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Çalışma Durumu
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Çalışma Modeli
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Değişiklik Kanalı
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10"
                      src="/placeholder.svg?height=40&width=40"
                      alt="MNG Kargo"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      MNG Kargo
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ---
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Aktif
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                tekera21'un Anlaşmalı Fiyatları ile Çalışma
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ---
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="outline"
                  className=""
                  onClick={() => setIsModalOpen(true)}
                >
                  Değiştir
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="h-6 w-6 rounded-full  flex items-center justify-center text-white text-sm">
              i
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              Aynı anda birden fazla kargo firması ile çalışarak kargo
              kapasitenizi daha verimli yönetmek için eğitimimizi
              <a href="#" className="font-medium  ">
                buradan
              </a>
              izleyebilir, Canlı Destek'e bağlanarak talebinizi iletebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <ChangeCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
