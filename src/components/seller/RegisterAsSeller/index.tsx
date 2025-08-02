"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Save } from "lucide-react";
import { useState } from "react";
import DocumentManager from "@/components/seller/RegisterAsSeller/DocumentManager";
import BankManager from "@/components/seller/RegisterAsSeller/BankManager";
import CompanyManager from "@/components/seller/RegisterAsSeller/CompanyManager";
import TaxManager from "@/components/seller/RegisterAsSeller/TaxManager";
import AddressManager from "@/components/seller/RegisterAsSeller/AddressManager";
import { ICategoryResponse } from "@/types/SellerTypes/CategoryTypes";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: "verified" | "pending" | "deleted" | "rejected" | "inceleniyor";
  fileUrl: string;
}

export interface ISellerFormData {
  name: string;
  categoryId: string[];
  email: string;
  gsmNumber: string;
  alternativePhoneNumber: string;
  supportPhoneNumber: string;
  taxNumber: string;
  taxOffice: string;
  merisNumber: string;
  registrationDate: Date | undefined;
  contactPersonNumber: string;
  contactPersonTitle: string;
  address: {
    city: string;
    street: string;
    postalCode: string;
    buildNo: string;
    doorNumber: string;
    detailAddress: string;
    country: string;
  }[];
  bankAccount: {
    iban: string;
    accountName: string;
    bankName: string;
    isActive: boolean;
  }[];
  documents: Document[];
}

export default function SellerRegistrationForm({
  categories,
}: {
  categories: ICategoryResponse;
}) {
  const [activeTab, setActiveTab] = useState("company");

  const methods = useForm<ISellerFormData>({
    defaultValues: {
      name: "",
      categoryId: [],
      email: "",
      gsmNumber: "",
      alternativePhoneNumber: "",
      supportPhoneNumber: "",
      taxNumber: "",
      taxOffice: "",
      merisNumber: "",
      registrationDate: undefined,
      contactPersonNumber: "",
      contactPersonTitle: "",
      address: [
        {
          city: "",
          street: "",
          postalCode: "",
          buildNo: "",
          doorNumber: "",
          detailAddress: "",
          country: "Turkey",
        },
      ],
      bankAccount: [
        {
          iban: "",
          accountName: "",
          bankName: "",
          isActive: true,
        },
      ],
      documents: [
        {
          id: "doc-1",
          name: "Kimlik Belgesi",
          type: "identity",
          uploadDate: "05.04.2023",
          status: "verified",
          fileUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "doc-2",
          name: "Vergi Levhası",
          type: "tax",
          uploadDate: "06.04.2023",
          status: "verified",
          fileUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "doc-3",
          name: "İmza Sirküleri",
          type: "signature",
          uploadDate: "07.04.2023",
          status: "pending",
          fileUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "doc-4",
          name: "Ticaret Sicil Gazetesi",
          type: "commercial",
          uploadDate: "08.04.2023",
          status: "verified",
          fileUrl: "/placeholder.svg?height=300&width=400",
        },
      ],
    },
  });

  const onSubmit = (data: ISellerFormData) => {
    console.log("Seller Data:", data);
    // Here you would typically send the data to your API
  };

  const [legalDocuments, setLegalDocuments] = useState<{
    [key: string]: File[];
  }>({});

  return (
    <div className="min-h-screen bg-gray-50 lg:p-4">
      <div className="lg:container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Bilgileri Düzenle</CardTitle>
          </CardHeader>
          <CardContent className="p-0 lg:p-6">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full lg:grid-cols-5 grid-cols-2 h-full">
                    <TabsTrigger value="company">Firma Bilgileri</TabsTrigger>
                    <TabsTrigger value="tax">Vergi Bilgileri</TabsTrigger>
                    <TabsTrigger value="address">Adres Bilgileri</TabsTrigger>
                    <TabsTrigger value="bank">Banka Bilgileri</TabsTrigger>
                    <TabsTrigger value="documents">Belgeler</TabsTrigger>
                  </TabsList>

                  {/* Company Information Tab */}
                  <TabsContent value="company" className="space-y-6 mt-6">
                    <CompanyManager categories={categories} />
                  </TabsContent>

                  {/* Tax Information Tab */}
                  <TabsContent value="tax" className="space-y-6 mt-6">
                    <TaxManager />
                  </TabsContent>

                  {/* Address Information Tab */}
                  <TabsContent value="address" className="space-y-6 mt-6">
                    <AddressManager />
                  </TabsContent>

                  {/* Bank Information Tab */}
                  <TabsContent value="bank" className="space-y-6 mt-6">
                    <BankManager />
                  </TabsContent>

                  <TabsContent value="documents" className="mt-0">
                    <DocumentManager
                      legalDocuments={legalDocuments}
                      setLegalDocuments={setLegalDocuments}
                    />
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                  <Button variant="outline" type="button">
                    İptal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Değişiklikleri Kaydet
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
