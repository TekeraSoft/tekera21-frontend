"use client";

import { FileUploadEnhanced } from "@/components/shared/FileUploadEnhanced";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { IProduct } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { createTargetPicture } from "@/app/actions/server/targetPicture.actions";
import TopBar from "../../TopBar";

interface ITargetPictureFormData {
  productId: string;
  image: File | null;
  defaultContent: File | null;
}

export default function TargetCreate({ product }: { product: IProduct }) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ITargetPictureFormData>({
    defaultValues: {
      productId: product.id,
    },
  });
  const [selectedTab, setSelectedTab] = useState("video");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ITargetPictureFormData) => {
    console.log("onsubmit data:", data);
    // Transform data to match the required format
    setLoading(true);
    const formData = new FormData();
    formData.append("productId", product.id);
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.defaultContent) {
      formData.append("defaultContent", data.defaultContent);
    }

    const { success, message } = await createTargetPicture(formData);

    if (success) {
      setLoading(false);
      toast({
        title: "Success",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Target Image is Created.",
        variant: "default",
      });
    } else {
      setLoading(false);
      toast({
        title: "Error",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Failed to create target image",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <div className="mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Ürün için AR içerik ekle</CardTitle>
            <CardDescription>
              Bu form ile ürününüze AR içerik ekleyebilirsiniz. Lütfen gerekli
              dosyaları yükleyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Selection */}

              {/* Image Upload */}
              <FileUploadEnhanced
                name="image"
                accept="image/*"
                label="Hedef Resim (Target Image)"
                description="PNG, JPG, GIF up to 10MB"
                icon="image"
                setFile={(file) => setValue("image", file)}
                file={watch("image") as File | null}
              />
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="flex space-x-4 border-b border-gray-300 mb-4 py-5">
                  <TabsTrigger
                    value="video"
                    className={`px-4 py-2 ${
                      selectedTab === "video"
                        ? "border-b-2 border-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    Video Yükle
                  </TabsTrigger>
                  <TabsTrigger
                    value="glb"
                    className={`px-4 py-2 ${
                      selectedTab === "glb"
                        ? "border-b-2 border-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    3D GLB Dosyası Yükle
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video">
                  <FileUploadEnhanced
                    name="defaultContent"
                    accept="video/*"
                    label="Hedef video (default content)"
                    description="MP4, MOV, AVI up to 100MB"
                    icon="image"
                    setFile={(file) => setValue("defaultContent", file)}
                    file={watch("defaultContent") as File | null}
                  />
                </TabsContent>

                <TabsContent value="glb">
                  <FileUploadEnhanced
                    name="defaultContent"
                    accept=".glb"
                    label="3D Glb Dosyası (default content)"
                    description="GLB file for 3D content"
                    icon="image"
                    setFile={(file) => setValue("defaultContent", file)}
                    file={watch("defaultContent") as File | null}
                  />
                </TabsContent>
              </Tabs>

              {/* Video Upload */}

              {/* Submit Button */}
              <Button disabled={loading} type="submit" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
