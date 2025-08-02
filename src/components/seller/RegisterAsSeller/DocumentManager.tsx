import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Trash2, Upload, UploadIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ISellerFormData } from ".";

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
  const { register, watch } = useFormContext<ISellerFormData>();
  const watchedData = watch();
  const documentFileRef = useRef<HTMLInputElement>(null);
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
              {watchedData.documents?.map((doc) => (
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
                    <Button variant="outline" size="sm" type="button">
                      Değiştir
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
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
  );
};

export default DocumentManager;
