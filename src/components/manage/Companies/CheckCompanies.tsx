"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Eye,
  FileText,
  Building2,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import { ISellerContent, TVerification } from "@/types/SellerTypes/SellerInfo";
import { IPage } from "@/types/Collection";
import { downloadFile } from "@/lib/downloadFiles";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with your actual data

export default function VerificationPanel({
  companies,
}: {
  companies: { content: ISellerContent[]; page: IPage };
}) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const getStatusBadge = (status: TVerification) => {
    const variants = {
      PENDING: "secondary",
      VERIFIED: "default",
      REJECTED: "destructive",
      CANCELLED: "destructive",
      NONE: "destructive",
    } as const;

    const statusText = {
      PENDING: "Bekliyor",
      VERIFIED: "Onaylandı",
      REJECTED: "Reddedildi",
      CANCELLED: "İptal Edildi",
      NONE: "Normal üye",
    };

    return (
      <Badge variant={variants[status]} className="capitalize">
        {statusText[status]}
      </Badge>
    );
  };

  const updateDocumentStatus = (
    company: ISellerContent,
    documentTitle: string,
    newStatus: TVerification
  ) => {
    console.log("value", newStatus, documentTitle, company);
  };

  const handleViewPdf = (documentUrl: string) => {
    const fileUrl =
      process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
      (documentUrl.startsWith("/") ? documentUrl : `/${documentUrl}`);
    setSelectedPdf(fileUrl);
  };

  const { toast } = useToast();

  const handleDownloadFile = async (url: string, name: string) => {
    try {
      await downloadFile(url, name);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Dosya indirilemedi.",
        variant: "destructive",
      });
    }
  };

  console.log(companies.content);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doğrulama Paneli</h1>
          <p className="text-muted-foreground">
            Şirket ve belge doğrulama durumlarını yönetin
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            {companies.content.length} Bekleyen Şirket
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="companies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="companies">Şirketler</TabsTrigger>
          <TabsTrigger value="documents">Belgeler</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-4">
          <div className="grid gap-4">
            {companies.content.map((company) => (
              <Card key={company.seller.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-lg">
                          {company.seller.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {company.seller.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {company.seller.gsmNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              company.seller.registrationDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(company.seller.verificationStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Vergi Numarası:</span>{" "}
                        {company.seller.taxNumber}
                      </div>
                      <div>
                        <span className="font-medium">Vergi Dairesi:</span>{" "}
                        {company.seller.taxOffice}
                      </div>
                      <div>
                        <span className="font-medium">
                          İletişim Kişisi Ünvanı:
                        </span>{" "}
                        {company.seller.contactPersonTitle}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Belgeler ({company.seller.identityDocumentPaths.length})
                      </h4>
                      <div className="space-y-2">
                        {company.seller.identityDocumentPaths.map(
                          (doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4" />
                                <div>
                                  <span className="font-medium">
                                    {doc.documentTitle}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(doc.verificationStatus)}
                                {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewPdf(doc.documentPath)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Görüntüle
                              </Button> */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDownloadFile(
                                      doc.documentPath,
                                      doc.documentTitle
                                    )
                                  }
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  İndir
                                </Button>
                                <Select
                                  value={doc.verificationStatus}
                                  onValueChange={(value: TVerification) =>
                                    updateDocumentStatus(
                                      company,
                                      doc.documentPath,
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-28">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">
                                      Bekliyor
                                    </SelectItem>
                                    <SelectItem value="APPROVED">
                                      Onaylandı
                                    </SelectItem>
                                    <SelectItem value="REJECTED">
                                      Reddedildi
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tüm Bekleyen Belgeler</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Şirket</TableHead>
                    <TableHead>Belge Başlığı</TableHead>
                    <TableHead>Belge Yolu</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.content.flatMap((company) =>
                    company.seller.identityDocumentPaths
                      .filter((doc) => doc.verificationStatus === "PENDING")
                      .map((doc, index) => (
                        <TableRow key={`${company.seller.id}-${index}`}>
                          <TableCell className="font-medium">
                            {company.seller.name}
                          </TableCell>
                          <TableCell>{doc.documentTitle}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {doc.documentPath}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(doc.verificationStatus)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewPdf(doc.documentPath)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Görüntüle
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownloadFile(
                                    doc.documentPath,
                                    doc.documentTitle
                                  )
                                }
                              >
                                <Download className="h-3 w-3 mr-1" />
                                İndir
                              </Button>
                              <Select
                                value={doc.verificationStatus}
                                onValueChange={(value: TVerification) =>
                                  updateDocumentStatus(
                                    company,
                                    doc.documentPath,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PENDING">
                                    Bekliyor
                                  </SelectItem>
                                  <SelectItem value="APPROVED">
                                    Onaylandı
                                  </SelectItem>
                                  <SelectItem value="REJECTED">
                                    Reddedildi
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PDF Viewer Dialog */}
      <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Belge Görüntüleyici</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
            {selectedPdf ? (
              <iframe
                src={selectedPdf}
                className="w-full h-[500px] border-0"
                title="PDF Viewer"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p>PDF görüntüleyici burada gösterilecek</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
