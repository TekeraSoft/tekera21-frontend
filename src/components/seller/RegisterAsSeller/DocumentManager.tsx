import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckSquare,
  Download,
  Trash2,
  Upload,
  UploadIcon,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ISellerFormData } from ".";
import { useToast } from "@/hooks/use-toast";
import { downloadFile } from "@/lib/downloadFiles";
import { getStatusBadge } from "@/components/manage/Companies/CheckCompanies";

const DocumentManager = ({
  legalDocuments,
  setLegalDocuments,
}: {
  legalDocuments: {
    [key: string]: File[];
  };
  setLegalDocuments: Dispatch<
    SetStateAction<{
      [key: string]: File[];
    }>
  >;
}) => {
  const { watch } = useFormContext<ISellerFormData>();
  const watchedData = watch();

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: string
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const originalFile = files[0];

    console.log("docid", docId);
    const reNamedFile = new File([originalFile], docId);

    setLegalDocuments((prev) => ({
      ...prev,
      [docId]: [reNamedFile],
    }));
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

  return (
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
              {watchedData.documents?.map((doc) => {
                const inputId = `documentFile-${doc.documentTitle}`;
                return (
                  <Card
                    key={doc.documentTitle}
                    className="overflow-hidden relative"
                  >
                    <div className="relative h-40 w-full">
                      {legalDocuments[doc.documentTitle] ? (
                        <div className="w-full h-full flex justify-center items-center gap-2">
                          Yeni Belge eklendi.
                          <CheckSquare className="text-green-600" />
                        </div>
                      ) : doc.documentPath ? (
                        <Image
                          onClick={() =>
                            handleDownloadFile(
                              doc.documentPath,
                              doc.documentTitle
                            )
                          }
                          src={"/assets/fileType/pdf.png"}
                          alt={doc.documentTitle}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="flex w-full justify-center pt-3 font-semibold text-secondary">
                          Belge Ekleyin
                        </div>
                      )}
                    </div>
                    <div className="absolute flex justify-center items-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      {legalDocuments[
                        doc.documentTitle
                      ] ? null : doc.documentPath ? (
                        <Download
                          onClick={() =>
                            handleDownloadFile(
                              doc.documentPath,
                              doc.documentTitle
                            )
                          }
                          className="w-16 h-16 cursor-pointer p-2"
                        />
                      ) : (
                        <div className="w-16 h-16 space-y-2 relative hover:bg-gray-100 ">
                          <Label htmlFor={inputId}>
                            <UploadIcon className="w-16 h-16 cursor-pointer p-2" />
                          </Label>
                          <Input
                            id={inputId}
                            type="file"
                            className="hidden"
                            onChange={(e) => onFileChange(e, doc.documentTitle)}
                            accept=".pdf"
                          />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{doc.documentTitle}</h3>
                          {/* <p className="text-xs text-muted-foreground">
                            Yükleme: {doc.uploadDate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Durum: {doc.status}
                          </p> */}
                          Durum: {getStatusBadge(doc.verificationStatus)}
                        </div>
                      </div>
                    </CardContent>

                    {doc.documentPath && (
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <Label htmlFor={inputId}>
                          <div className="outline outline-gray-400/50 hover:bg-accent cursor-pointer rounded-md px-3 py-3">
                            Değiştir
                          </div>
                        </Label>
                        <Input
                          id={inputId}
                          type="file"
                          className="hidden"
                          onChange={(e) => onFileChange(e, doc.documentTitle)}
                          accept=".pdf"
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1 ml-auto"
                        >
                          <Trash2 className="h-3 w-3" />
                          Sil
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManager;
