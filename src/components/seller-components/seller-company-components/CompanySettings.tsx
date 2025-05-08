"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState("user-info");

  // Mock user data
  const userData = {
    name: "ARZUAMBER MODA",
    role: "Yönetici Personel",
    email: "arzuambermoda@gmail.com",
    phone: "+9053****8385",
    mssPhone: "053****8385",
    memberSince: "12 Mart 2025",
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
          <TabsTrigger
            value="user-info"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span className="text-orange-500 font-bold">Kullanıcı</span>
              <span className="text-orange-500">Bilgileri</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="communication-preferences"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>İletişim</span>
              <span>Tercihleri</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="company-info"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>Firma</span>
              <span>Bilgileri</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="address-contact"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>Adres ve İletişim</span>
              <span>Bilgileri</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="contracts-documents"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>Sözleşme ve</span>
              <span>Belgeler</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>İzinler</span>
              <span>&nbsp;</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="integration-info"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span>Entegrasyon</span>
              <span>Bilgileri</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="micro-export"
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center relative">
              <span>Mikro</span>
              <span>İhracat</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-sm">
                Yeni
              </span>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-white p-6 rounded-md shadow-sm">
          <TabsContent value="user-info">
            <UserInfoTab userData={userData} />
          </TabsContent>
          <TabsContent value="communication-preferences">
            <CommunicationPreferencesTab />
          </TabsContent>
          <TabsContent value="company-info">
            <CompanyInfoTab />
          </TabsContent>
          <TabsContent value="address-contact">
            <AddressContactTab />
          </TabsContent>
          <TabsContent value="contracts-documents">
            <ContractsDocumentsTab />
          </TabsContent>
          <TabsContent value="permissions">
            <PermissionsTab />
          </TabsContent>
          <TabsContent value="integration-info">
            <IntegrationInfoTab />
          </TabsContent>
          <TabsContent value="micro-export">
            <MicroExportTab />
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
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
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Üyelik Tarihi: {userData.memberSince}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Çerezleri Yönet</span>
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
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
          </svg>
        </div>
      </div>
    </div>
  );
}
