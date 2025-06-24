"use client";
import { createTargetPicture } from "@/app/actions";
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

  const onSubmit = async (data: ITargetPictureFormData) => {
    console.log("onsubmit data:", data);
    // Transform data to match the required format
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
      toast({
        title: "Success",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Target Image is Created.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Failed to create category",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Media Upload</CardTitle>
          <CardDescription>
            Select a product and upload associated media files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Selection */}

            {/* Image Upload */}
            <FileUploadEnhanced
              name="image"
              accept="image/*"
              label="Target Image"
              description="PNG, JPG, GIF up to 10MB"
              icon="image"
              setFile={(file) => setValue("image", file)}
              file={watch("image") as File | null}
            />
            <FileUploadEnhanced
              name="defaultContent"
              accept="video/*"
              label="Target Video (default content)"
              description="MP4, MOV, AVI up to 100MB"
              icon="image"
              setFile={(file) => setValue("defaultContent", file)}
              file={watch("defaultContent") as File | null}
            />

            {/* Video Upload */}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
