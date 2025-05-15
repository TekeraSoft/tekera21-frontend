import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerCompanyUserPermissionsTab from "./tabs/SellerCompanyUserPermissionsTab";
import SelllerCompanyInfoTab from "./tabs/SellerCompanyInfoTab";
import SellerCompanyContactTab from "./tabs/SellerCompanyContactTab";
import SellerCompanyCommunicationTab from "./tabs/SellerCompanyCommunicationTab";
import SellerCompanyIntegrationInfoTab from "./tabs/SellerCompanyIntegrationInfoTab";

export default function SellerCompanySettings() {
  const userData = {
    name: "ARZUAMBER MODA",
    role: "Yönetici Personel",
    email: "arzuambermoda@gmail.com",
    phone: "+9053****8385",
    mssPhone: "053****8385",
    memberSince: "12 Mart 2025",
  };

  const tabItems = [
    {
      value: "compnay-owner-info",
      label: "Kullanıcı Bilgileri",
    },
    {
      value: "communication-preferences",
      label: "İletişim Tercihleri",
    },
    {
      value: "company-info",
      label: "Firma Bilgileri",
    },
    {
      value: "address-contact",
      label: "Adres ve İletişim Bilgileri",
    },
    {
      value: "integration-info",
      label: "Entegrasyon Bilgileri",
    },
  ];

  return (
    <Tabs defaultValue="compnay-owner-info" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full min-h-20 items-center overflow-x-auto gap-2">
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-xs md:text-sm font-medium"
          >
            <div className="flex flex-col items-center">{tab.label}</div>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-6 bg-white p-6 rounded-md shadow-sm">
        <TabsContent value="compnay-owner-info">
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

        <TabsContent value="integration-info">
          <SellerCompanyIntegrationInfoTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
