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
import { registerAsSeller } from "@/app/actions/server/general.actions";
import { useToast } from "@/hooks/use-toast";
import { IdentityDocument, ISellerInfo } from "@/types/SellerTypes/SellerInfo";
import { IShippingCompany } from "@/types/SellerTypes/ShippingCompanies";

export interface ISellerFormData {
  name: string;
  categoryId: { value: string }[];
  email: string;
  gsmNumber: string;
  alternativePhoneNumber: string;
  shippingCompanies: { value: string }[];
  supportPhoneNumber: string;
  logo?: string;
  taxNumber: string;
  taxOffice: string;
  merisNumber: string;
  registrationDate: string | undefined;
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
  documents: IdentityDocument[];
}

export default function SellerRegistrationForm({
  categories,
  sellerInfo,
  shippingCompanies,
}: {
  categories: ICategoryResponse;
  sellerInfo: ISellerInfo | undefined;
  shippingCompanies: IShippingCompany[];
}) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [legalDocuments, setLegalDocuments] = useState<{
    [key: string]: File[];
  }>({});
  const [logo, setLogo] = useState<File>();

  const requiredDocuments: IdentityDocument[] = [
    {
      documentTitle: "IDENTITY_NUMBER",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "TAX_CERTIFICATE",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "SIGNATURE_CIRCULAR",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "COMMERCIAL_REGISTER_GAZETTE",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "PTS",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "MINISTRY_OF_AGRICULTURE_PERMITS",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "CE_CERTIFICATE",
      documentPath: "",
      verificationStatus: "NONE",
    },
    {
      documentTitle: "GUARANTEE_DOCUMENT",
      documentPath: "",
      verificationStatus: "NONE",
    },
  ];

  const mergeDocuments = (
    uploadedDocuments: IdentityDocument[]
  ): IdentityDocument[] => {
    return requiredDocuments.map((doc) => {
      const uploaded = uploadedDocuments.find(
        (u) => u.documentTitle === doc.documentTitle
      );
      return uploaded ?? doc;
    });
  };

  const methods = useForm<ISellerFormData>({
    defaultValues: {
      name: sellerInfo?.name || "",
      categoryId: sellerInfo?.categories.map((category) => {
        const item = { value: category.id };
        return item;
      }),
      email: sellerInfo?.email || "",
      gsmNumber: sellerInfo?.gsmNumber || "",
      logo: sellerInfo?.logo || undefined,
      alternativePhoneNumber: sellerInfo?.alternativePhoneNumber || "",
      supportPhoneNumber: sellerInfo?.supportPhoneNumber || "",
      taxNumber: sellerInfo?.taxNumber || "",
      taxOffice: sellerInfo?.taxOffice || "",
      merisNumber: sellerInfo?.merisNumber || "",
      registrationDate: sellerInfo?.registrationDate || undefined,
      contactPersonNumber: sellerInfo?.contactPersonNumber || "",
      contactPersonTitle: sellerInfo?.contactPersonTitle || "",
      shippingCompanies: sellerInfo?.shippingCompanies?.map(
        (shippingCompany) => {
          const item = { value: shippingCompany.id };
          return item;
        }
      ),
      address: sellerInfo?.address || [
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
      bankAccount: sellerInfo?.bankAccounts || [
        {
          iban: "",
          accountName: "",
          bankName: "",
          isActive: true,
        },
      ],
      documents: sellerInfo?.identityDocumentPaths
        ? mergeDocuments(sellerInfo.identityDocumentPaths)
        : requiredDocuments,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: ISellerFormData) => {
    const formData = new FormData();

    const formattedData: ISellerRegister = {
      address: data.address,
      alternativePhoneNumber: data.alternativePhoneNumber,
      bankAccount: data.bankAccount,
      categoryId: data.categoryId.map((cat) => cat.value),
      contactPersonNumber: data.contactPersonNumber,
      name: data.name,
      email: data.email,
      shippingCompanies: data.shippingCompanies.map(
        (shippnCompany) => shippnCompany.value
      ),
      gsmNumber: data.gsmNumber,
      supportPhoneNumber: data.supportPhoneNumber,
      taxNumber: data.taxNumber,
      taxOffice: data.taxOffice,
      merisNumber: data.merisNumber,
      registrationDate: data.registrationDate
        ? new Date(data.registrationDate).toISOString()
        : new Date().toISOString(),
      contactPersonTitle: data.contactPersonTitle,
    };
    console.log("formattedData", formattedData);
    formData.append(
      "data",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );

    Object.values(legalDocuments).forEach((fileArray) => {
      fileArray.forEach((file) => {
        formData.append(`files`, file);
      });
    });
    if (logo) {
      formData.append(`logo`, logo);
    }

    const { success, message } = await registerAsSeller(formData);
    if (success) {
      toast({
        title: "Başarılı!",
        description:
          "İsteğiniz başarılı. Gerekli incelemeler yapıldıktan sonra hesabınız kullanıma açılacaktır.",
        variant: "default",
      });
      setLegalDocuments({});
      setLoading(false);
    } else {
      toast({
        title: "Error",
        description: message || "Kaydınız oluşturulamadı.",
        variant: "destructive",
      });
      setLoading(false);
    }

    // Here you would typically send the data to your API
  };

  const handleSetLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

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
                    <CompanyManager
                      categories={categories}
                      logo={logo}
                      handleSetLogo={handleSetLogo}
                      shippingCompanies={shippingCompanies}
                    />
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
