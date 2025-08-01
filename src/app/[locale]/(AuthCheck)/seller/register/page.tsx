import Image from "next/image";
import { User, Building, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { sellerRegisterUserData } from "@/data/sellerRegisterData";

// Example user data

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-y-5">
        <h1 className="text-3xl font-bold">Kayıt Bilgileri ve Belgeler</h1>
        <Link href="/seller/register/edit">
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Bilgileri Düzenle
          </Button>
        </Link>
      </div>

      {/* User and Company Info Card */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Kullanıcı Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${sellerRegisterUserData.name}`}
                  alt={sellerRegisterUserData.name}
                />
                <AvatarFallback>
                  {sellerRegisterUserData.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">
                  {sellerRegisterUserData.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {sellerRegisterUserData.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sellerRegisterUserData.phone}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={
                      sellerRegisterUserData.status === "verified"
                        ? "success"
                        : "outline"
                    }
                    className="bg-green-100 text-green-800 hover:bg-green-200"
                  >
                    {sellerRegisterUserData.status === "verified"
                      ? "Onaylanmış"
                      : "Beklemede"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Kayıt: {sellerRegisterUserData.registrationDate}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Firma Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 relative border rounded-md overflow-hidden">
                <Image
                  src={
                    sellerRegisterUserData.company.logo || "/placeholder.svg"
                  }
                  alt={sellerRegisterUserData.company.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">
                  {sellerRegisterUserData.company.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vergi No: {sellerRegisterUserData.company.taxId}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sellerRegisterUserData.company.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sektör: {sellerRegisterUserData.company.industry}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Belgeler</CardTitle>
          <CardDescription>
            Kayıt sürecinde yüklenen tüm belgeler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="verified">Onaylananlar</TabsTrigger>
              <TabsTrigger value="pending">Bekleyenler</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sellerRegisterUserData.documents.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sellerRegisterUserData.documents
                  .filter((doc) => doc.status === "verified")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sellerRegisterUserData.documents
                  .filter((doc) => doc.status === "pending")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}
    </div>
  );
}
