"use client";

import { useState, useRef, type FormEvent, type ChangeEvent, JSX } from "react";
import Image from "next/image";
import {
  User,
  Building,
  Upload,
  ArrowLeft,
  Save,
  Trash2,
  UploadIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/i18n/navigation";
import { useDialogContext } from "@/context/DialogContext";
import ApproveDelete from "@/components/superadmin/Dialog/ApproveDelete";

// TypeScript interfaces
interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: "verified" | "pending" | "deleted" | "rejected" | "inceleniyor";
  fileUrl: string;
}

interface Company {
  name: string;
  logo: string;
  taxId: string;
  address: string;
  industry: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: "verified" | "pending";
  company: Company;
  documents: Document[];
}

// Example user data - same as in the view page
const userData: UserData = {
  id: "12345",
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 555 123 4567",
  registrationDate: "10.04.2023",
  status: "verified",
  company: {
    name: "Teknoloji A.Ş.",
    logo: "/placeholder.svg?height=100&width=100",
    taxId: "1234567890",
    address: "Levent, İstanbul, Türkiye",
    industry: "Yazılım ve Teknoloji",
  },
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
};

export default function EditDocumentsPage(): JSX.Element {
  const { toast } = useToast();
  const [user, setUser] = useState<UserData>(userData);

  const { setDialogStatus } = useDialogContext();
  const documentNameRef = useRef<HTMLInputElement>(null);
  const documentTypeRef = useRef<HTMLSelectElement>(null);
  const documentFileRef = useRef<HTMLInputElement>(null);

  // Form submission handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // In a real app, you would send the updated data to your API here
    toast({
      title: "Değişiklikler kaydedildi",
      description: "Bilgileriniz başarıyla güncellendi.",
    });
  };

  // Update user data
  const updateUser = (
    field: keyof Omit<UserData, "company" | "documents">,
    value: string
  ): void => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update company data
  const updateCompany = (field: keyof Company, value: string): void => {
    setUser((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  // Handle document deletion
  const handleDeleteDocument = (docType?: string): void => {
    const doc = user.documents.find((d) => d.type === docType);
    if (!doc) {
      toast({
        title: "Hata",
        description: "Belge bulunamadı.",
        variant: "destructive",
      });
      return;
    }
    const updatedDocuments = user.documents.map((d) =>
      d.type === docType ? { ...d, status: "deleted" as const } : d
    );
    setDialogStatus({ isOpen: false, value: "" });
    setUser((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));

    toast({
      title: "Belge silindi",
      description: "Belge başarıyla silindi.",
    });
  };

  // Handle document upload
  const handleDocumentUpload = (): void => {
    if (
      !documentNameRef.current?.value ||
      !documentTypeRef.current?.value ||
      !documentFileRef.current?.files?.[0]
    ) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    const docName = documentNameRef.current.value;
    const docType = documentTypeRef.current.value;

    // In a real app, you would upload the file to your server here
    // For now, we'll just add a placeholder
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: docName,
      type: docType,
      uploadDate: new Date().toLocaleDateString("tr-TR"),
      status: "pending",
      fileUrl: "/placeholder.svg?height=300&width=400",
    };

    setUser((prev) => ({
      ...prev,
      documents: [...prev.documents, newDoc],
    }));

    toast({
      title: "Belge yüklendi",
      description: "Belge başarıyla yüklendi ve inceleme için gönderildi.",
    });

    // Reset the form fields
    documentNameRef.current.value = "";
    documentTypeRef.current.value = "";
    documentFileRef.current.value = "";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap w-full items-center justify-between mb-6 gap-y-5">
        <h1 className="text-3xl font-bold">Bilgileri Düzenle</h1>
        <Link href="/register">
          <Button variant="outline" className="flex items-center gap-2 p-2">
            <ArrowLeft className="h-4 w-4" />
            Görüntüleme Sayfasına Dön
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Kişisel Bilgiler</TabsTrigger>
            <TabsTrigger value="company">Firma Bilgileri</TabsTrigger>
            <TabsTrigger value="documents">Belgeler</TabsTrigger>
            <TabsTrigger value="sozlesmeler">Sözleşmeler</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kişisel Bilgiler
                </CardTitle>
                <CardDescription>
                  Kişisel bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      Fotoğraf Değiştir
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad</Label>
                        <Input
                          id="name"
                          value={user.name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUser("name", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUser("email", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUser("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Değişiklikleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Company Information Tab */}
          <TabsContent value="company" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Firma Bilgileri
                </CardTitle>
                <CardDescription>
                  Firma bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-24 w-24 relative border rounded-md overflow-hidden">
                      <Image
                        src={user.company.logo || "/placeholder.svg"}
                        alt={user.company.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Logo Değiştir
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Firma Adı</Label>
                        <Input
                          id="companyName"
                          value={user.company.name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateCompany("name", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxId">Vergi Numarası</Label>
                        <Input
                          id="taxId"
                          value={user.company.taxId}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateCompany("taxId", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Sektör</Label>
                        <Input
                          id="industry"
                          value={user.company.industry}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateCompany("industry", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Adres</Label>
                        <Textarea
                          id="address"
                          value={user.company.address}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            updateCompany("address", e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Değişiklikleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Belge Yönetimi
                </CardTitle>
                <CardDescription>
                  Belgelerinizi yönetin ve yenilerini yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Upload New Document */}

                  <Separator />

                  {/* Existing Documents */}
                  <div>
                    <h3 className="font-medium mb-3">Belgeler</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {user.documents.map((doc) => (
                        <Card key={doc.id} className="overflow-hidden relative">
                          <div className="relative h-40 w-full">
                            <Image
                              src={doc.fileUrl || "/placeholder.svg"}
                              alt={doc.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute flex justify-center items-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            <div className="w-16 h-16 space-y-2 relative hover:bg-gray-100 ">
                              <Label htmlFor="documentFile">
                                <UploadIcon className="w-16 h-16 cursor-pointer p-2" />
                              </Label>
                              <Input
                                id="documentFile"
                                type="file"
                                className="hidden"
                                ref={documentFileRef}
                              />
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{doc.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  Yükleme: {doc.uploadDate}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Durum: {doc.status}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <Button variant="outline" size="sm">
                              Değiştir
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setDialogStatus({
                                  isOpen: true,
                                  value: doc.type,
                                })
                              }
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Sil
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Tüm Değişiklikleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="sozlesmeler" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Belge Yönetimi
                </CardTitle>
                <CardDescription>
                  Belgelerinizi yönetin ve yenilerini yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Upload New Document */}

                  <Separator />

                  {/* Existing Documents */}
                  <div>
                    <h3 className="font-medium mb-3">Belgeler</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {user.documents.map((doc) => (
                        <Card key={doc.id} className="overflow-hidden relative">
                          <div className="relative h-40 w-full">
                            <Image
                              src={doc.fileUrl || "/placeholder.svg"}
                              alt={doc.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute flex justify-center items-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            <div className="w-16 h-16 space-y-2 relative hover:bg-gray-100 ">
                              <Label htmlFor="documentFile">
                                <UploadIcon className="w-16 h-16 cursor-pointer p-2" />
                              </Label>
                              <Input
                                id="documentFile"
                                type="file"
                                className="hidden"
                                ref={documentFileRef}
                              />
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{doc.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  Yükleme: {doc.uploadDate}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Durum: {doc.status}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <Button variant="outline" size="sm">
                              Değiştir
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setDialogStatus({
                                  isOpen: true,
                                  value: doc.type,
                                })
                              }
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Sil
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Tüm Değişiklikleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>

      <ApproveDelete handler={handleDeleteDocument} />
    </div>
  );
}
