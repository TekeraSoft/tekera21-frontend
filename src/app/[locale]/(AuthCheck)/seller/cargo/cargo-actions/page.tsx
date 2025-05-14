import SellerCargoCalculatorTab from "@/components/seller-components/cargo/SellerCargoCalculatorTab";
import SellerCargoCompaniesTab from "@/components/seller-components/cargo/SellerCargoCompaniesTab";
import SellerCargoQuestionsTab from "@/components/seller-components/cargo/SellerCargoQuestionsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function SellerCargoActionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="companies">
          <TabsList>
            <TabsTrigger value="companies">Kargo Firmaları</TabsTrigger>
            <TabsTrigger value="faq">Sıkça Sorulan Sorular</TabsTrigger>
            <TabsTrigger value="calculator">Desi Hesapla</TabsTrigger>
          </TabsList>

          <TabsContent value="companies">
            <SellerCargoCompaniesTab />
          </TabsContent>

          <TabsContent value="faq">
            <SellerCargoQuestionsTab />
          </TabsContent>

          <TabsContent value="calculator">
            <SellerCargoCalculatorTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
