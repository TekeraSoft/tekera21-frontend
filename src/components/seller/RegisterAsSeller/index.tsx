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
import { useToast } from "@/hooks/use-toast";
import { IIdentityDocument, ISellerInfo } from "@/types/SellerTypes/SellerInfo";
import { IShippingCompany } from "@/types/SellerTypes/ShippingCompanies";
import {
  sellerRegister,
  updateSeller,
} from "@/app/actions/server/seller.actions";
import { getUser } from "@/app/actions/server/auth.actions";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthContext } from "@/context/AuthContext";

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
  documents: IIdentityDocument[];
}

const SellerFormSchema = z.object({
  name: z.string().min(1, "Mağaza adı zorunlu"),
  categoryId: z
    .array(z.object({ value: z.string().uuid("Geçerli kategori ID girin") }))
    .nonempty("En az 1 kategori seçmelisiniz"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  gsmNumber: z.string().min(10, "Geçerli bir telefon numarası girin"),
  logo: z.any().optional(),
  alternativePhoneNumber: z.string().optional(),
  supportPhoneNumber: z.string().optional(),
  taxNumber: z.string().min(10, "Vergi numarası en az 10 haneli olmalı"),
  taxOffice: z.string().min(1, "Vergi dairesi zorunlu"),
  merisNumber: z.string().min(16, "Mersis numarası en az 16 haneli olmalı"),
  registrationDate: z.any().optional(),
  contactPersonNumber: z.string().optional(),
  contactPersonTitle: z.string().optional(),
  shippingCompanies: z.array(z.object({ value: z.string().uuid() })).optional(),
  address: z.array(
    z.object({
      city: z.string().min(1, "Şehir zorunlu"),
      street: z.string().optional(),
      postalCode: z.string().optional(),
      buildNo: z.string().optional(),
      doorNumber: z.string().optional(),
      detailAddress: z.string().optional(),
      country: z.string().min(1, "Ülke zorunlu"),
    })
  ),
  bankAccount: z.array(
    z.object({
      iban: z.string().min(10, "Geçerli IBAN girin"),
      accountName: z.string().min(1, "Hesap adı zorunlu"),
      bankName: z.string().min(1, "Banka adı zorunlu"),
      isActive: z.boolean(),
    })
  ),
  documents: z.any(), // Eğer spesifik formatın varsa burada da şema yaz
});

export default function SellerRegistrationForm({
  categories,
  sellerInfo,
  shippingCompanies,
}: {
  categories: ICategoryResponse;
  sellerInfo: ISellerInfo | undefined;
  shippingCompanies: IShippingCompany[];
}) {
  const { userInfo } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [legalDocuments, setLegalDocuments] = useState<{
    [key: string]: File[];
  }>({});
  const [logo, setLogo] = useState<File>();

  const requiredDocuments: IIdentityDocument[] = [
    {
      documentTitle: "IDENTITY_DOCUMENT_COPY",
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
    uploadedDocuments: IIdentityDocument[]
  ): IIdentityDocument[] => {
    return requiredDocuments.map((doc) => {
      const uploaded = uploadedDocuments.find(
        (u) => u.documentTitle === doc.documentTitle
      );
      return uploaded ?? doc;
    });
  };

  const methods = useForm<z.infer<typeof SellerFormSchema>>({
    resolver: zodResolver(SellerFormSchema),
    defaultValues: {
      name: sellerInfo?.name || "",
      categoryId: sellerInfo?.categories.map((category) => {
        const item = { value: category.id };
        return item;
      }),
      email: userInfo?.email || "",
      gsmNumber: sellerInfo?.gsmNumber || "",
      logo: sellerInfo?.logo || "",
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
      documents: sellerInfo?.sellerDocument
        ? mergeDocuments(sellerInfo.sellerDocument)
        : requiredDocuments,
    }, // Senin yukarıdaki defaultValues
  });

  // const methods2 = useForm<ISellerFormData>({
  //   defaultValues: {
  //     name: sellerInfo?.name || "",
  //     categoryId: sellerInfo?.categories.map((category) => {
  //       const item = { value: category.id };
  //       return item;
  //     }),
  //     email: sellerInfo?.email || "",
  //     gsmNumber: sellerInfo?.gsmNumber || "",
  //     logo: sellerInfo?.logo || undefined,
  //     alternativePhoneNumber: sellerInfo?.alternativePhoneNumber || "",
  //     supportPhoneNumber: sellerInfo?.supportPhoneNumber || "",
  //     taxNumber: sellerInfo?.taxNumber || "",
  //     taxOffice: sellerInfo?.taxOffice || "",
  //     merisNumber: sellerInfo?.merisNumber || "",
  //     registrationDate: sellerInfo?.registrationDate || undefined,
  //     contactPersonNumber: sellerInfo?.contactPersonNumber || "",
  //     contactPersonTitle: sellerInfo?.contactPersonTitle || "",
  //     shippingCompanies: sellerInfo?.shippingCompanies?.map(
  //       (shippingCompany) => {
  //         const item = { value: shippingCompany.id };
  //         return item;
  //       }
  //     ),
  //     address: sellerInfo?.address || [
  //       {
  //         city: "",
  //         street: "",
  //         postalCode: "",
  //         buildNo: "",
  //         doorNumber: "",
  //         detailAddress: "",
  //         country: "Turkey",
  //       },
  //     ],
  //     bankAccount: sellerInfo?.bankAccounts || [
  //       {
  //         iban: "",
  //         accountName: "",
  //         bankName: "",
  //         isActive: true,
  //       },
  //     ],
  //     documents: sellerInfo?.sellerDocument
  //       ? mergeDocuments(sellerInfo.sellerDocument)
  //       : requiredDocuments,
  //   },
  // });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof SellerFormSchema>) => {
    const formData = new FormData();
    const user = await getUser();

    const formattedData: ISellerRegister = {
      ...(sellerInfo?.id && { id: sellerInfo.id }),
      ...(sellerInfo?.sellerDocument && {
        sellerDocument: sellerInfo.sellerDocument,
      }),
      address: data.address.map((addr) => ({
        ...addr,
        street: addr.street || "",
        postalCode: addr.postalCode || "",
        buildNo: addr.buildNo || "",
        doorNumber: addr.doorNumber || "",
        detailAddress: addr.detailAddress || "",
      })),
      alternativePhoneNumber: data.alternativePhoneNumber || "",
      bankAccount: data.bankAccount,
      categoryId: data.categoryId.map((cat) => cat.value),
      contactPersonNumber: data.contactPersonNumber || "",
      name: data.name,
      email: user?.email || data.email,
      shippingCompanies:
        data.shippingCompanies?.map((shippnCompany) => shippnCompany.value) ||
        [],
      gsmNumber: data.gsmNumber,
      supportPhoneNumber: data.supportPhoneNumber || "",
      taxNumber: data.taxNumber,
      taxOffice: data.taxOffice,
      merisNumber: data.merisNumber || "",
      registrationDate: data.registrationDate
        ? new Date(data.registrationDate).toISOString()
        : new Date().toISOString(),
      contactPersonTitle: data.contactPersonTitle || "",
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );

    if (Object.values(legalDocuments).length) {
      Object.values(legalDocuments).forEach((fileArray) => {
        fileArray.forEach((file) => {
          formData.append(`files`, file);
        });
      });
    } else {
      formData.append("files", new File([""], ""), "empty.pdf");
    }

    if (logo) {
      formData.append(`logo`, logo);
    } else {
      formData.append("logo", new File([""], ""), "empty.jpg");
    }

    if (sellerInfo?.id) {
      const { success, message } = await updateSeller(formData);
      if (success) {
        const sellerForm = methods.getValues();
        const newData = {
          ...sellerForm,
          documents: sellerInfo?.sellerDocument
            ? mergeDocuments(sellerInfo.sellerDocument)
            : requiredDocuments,
        };
        methods.reset(newData);
        console.log("sellerform", sellerForm);
        toast({
          title: "Başarılı!",
          description:
            "Güncelleme İsteğiniz başarılı. Gerekli incelemeler yapıldıktan sonra hesabınız kullanıma açılacaktır.",
          variant: "default",
        });

        setLegalDocuments({});
        setLoading(false);
      } else {
        toast({
          title: "Error",
          description: message || "Güncelleme yapılamadı.",
          variant: "destructive",
        });
        setLoading(false);
      }
    } else {
      console.log("create", formattedData);
      const { success, message } = await sellerRegister(formData);
      if (success) {
        const sellerForm = methods.getValues();
        const newData = {
          ...sellerForm,
          documents: sellerInfo?.sellerDocument
            ? mergeDocuments(sellerInfo.sellerDocument)
            : requiredDocuments,
        };
        methods.reset(newData);
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
    }

    // Here you would typically send the data to your API
  };

  const handleSetLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  console.log("seller", sellerInfo);

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

                <div className="mt-4">
                  {!!Object.keys(methods.formState.errors).length && (
                    <Alert>
                      <AlertTitle className="text-red-800">Hata</AlertTitle>
                      <AlertDescription className="text-red-500">
                        {Object.values(methods.formState.errors)
                          .map((error) => error.message)
                          .join(", ")}
                      </AlertDescription>
                    </Alert>
                  )}
                  {Object.keys(legalDocuments).length === 0 &&
                    !sellerInfo?.sellerDocument.length && (
                      <p className="text-yellow-700 ml-auto">
                        Henüz hiçbir belge yüklenmedi.
                      </p>
                    )}
                  {!logo && !sellerInfo?.logo.length && (
                    <p className="text-yellow-700 ml-auto">
                      Logo henüz yüklenmedi.
                    </p>
                  )}
                  <div className="flex justify-end gap-3 border-t mt-4 pt-2">
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
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
