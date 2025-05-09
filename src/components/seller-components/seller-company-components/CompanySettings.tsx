"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Sticker } from "lucide-react";
import SellerCompanyUserPermissionsTab from "./tabs/SellerCompanyUserPermissionsTab";
import SelllerCompanyInfoTab from "./tabs/SellerCompanyInfoTab";
import SellerCompanyContactTab from "./tabs/SellerCompanyContactTab";
import SellerContractsDocsTab from "./tabs/SellerCompanyContractsDocsTab";
import SellerCompanyPermissionsTab from "./tabs/SellerCompanyPermissionsTab";
import SellerCompanyCommunicationTab from "./tabs/SellerCompanyCommunicationTab";
import SellerCompanyIntegrationInfoTab from "./tabs/SellerCompanyIntegrationInfoTab";

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
    <div className="">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid  grid-cols-4 lg:grid-cols-7   w-full  min-h-32 lg:min-h-20 items-center">
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
        </TabsList>

        <div className="mt-6 bg-white p-6 rounded-md shadow-sm">
          <TabsContent value="user-info">
            <SellerCompanyUserPermissionsTab userData={userData} />
          </TabsContent>
          <TabsContent value="communication-preferences">
            <SellerCompanyCommunicationTab />
          </TabsContent>
          <TabsContent value="company-info">
            <SelllerCompanyInfoTab />
          </TabsContent>
          <TabsContent value="address-contact">
            <SellerCompanyContactTab />
          </TabsContent>
          <TabsContent value="contracts-documents">
            <SellerContractsDocsTab />
          </TabsContent>
          <TabsContent value="permissions">
            <SellerCompanyPermissionsTab />
          </TabsContent>
          <TabsContent value="integration-info">
            <SellerCompanyIntegrationInfoTab />
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Info size={16} />
          <span>Üyelik Tarihi: {userData.memberSince}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Çerezleri Yönet</span>
          <Sticker size={16} />
        </div>
      </div>
    </div>
  );
}
