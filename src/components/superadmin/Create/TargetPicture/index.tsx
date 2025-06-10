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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { IProduct } from "@/types/product";
import ImageView from "@/components/shared/ImageView";

interface ITargetPictureFormData {
  productId: string;
  image: File | null;
  defaultContent: File | null;
}

export default function TargetCreate({ products }: { products: IProduct[] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ITargetPictureFormData>({
    defaultValues: {
      productId: "",
    },
  });

  const onSubmit = async (data: ITargetPictureFormData) => {
    console.log("onsubmit data:", data);
    // Transform data to match the required format
    const formData = new FormData();
    formData.append("productId", "077f77a0-a873-4a45-a5d6-3b74099b759e");
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.defaultContent) {
      formData.append("defaultContent", data.defaultContent);
    }
    const result = await createTargetPicture(formData);

    if (result.success) {
      alert("Media uploaded successfully!");
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
            <div className="space-y-2">
              <Label htmlFor="product-select">Select Product</Label>
              <Select name="product" required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-3">
                        <ImageView
                          imageInfo={{
                            url:
                              product.variations[0].images[0] ||
                              "/placeholder.svg",
                            name: product.name,
                          }}
                          className="rounded-md object-cover w-8 h-8"
                        />
                        <span>{product.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
