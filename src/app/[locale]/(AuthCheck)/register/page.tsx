import Image from "next/image";
import { User, Building, CheckCircle, AlertCircle, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// Example user data
const userData = {
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

type typeUserData = typeof userData;

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-y-5">
        <h1 className="text-3xl font-bold">Kayıt Bilgileri ve Belgeler</h1>
        <Link href="/register/edit">
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
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`}
                  alt={userData.name}
                />
                <AvatarFallback>
                  {userData.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userData.phone}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={
                      userData.status === "verified" ? "success" : "outline"
                    }
                    className="bg-green-100 text-green-800 hover:bg-green-200"
                  >
                    {userData.status === "verified"
                      ? "Onaylanmış"
                      : "Beklemede"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Kayıt: {userData.registrationDate}
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
                  src={userData.company.logo || "/placeholder.svg"}
                  alt={userData.company.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">{userData.company.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Vergi No: {userData.company.taxId}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userData.company.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sektör: {userData.company.industry}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Section */}
      <Card>
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
                {userData.documents.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userData.documents
                  .filter((doc) => doc.status === "verified")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userData.documents
                  .filter((doc) => doc.status === "pending")
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentCard({
  document,
}: {
  document: typeUserData["documents"][number];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={document.fileUrl || "/placeholder.svg"}
          alt={document.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{document.name}</h3>
            <p className="text-xs text-muted-foreground">
              Yükleme: {document.uploadDate}
            </p>
          </div>
          {document.status === "verified" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <Badge
          variant="outline"
          className={
            document.status === "verified"
              ? "mt-2 bg-green-50 text-green-700"
              : "mt-2 bg-amber-50 text-amber-700"
          }
        >
          {document.status === "verified" ? "Onaylandı" : "İnceleniyor"}
        </Badge>
      </CardContent>
    </Card>
  );
}
