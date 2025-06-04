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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Smart Watch",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Gaming Mouse",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "USB-C Cable",
    image: "/placeholder.svg?height=40&width=40",
  },
];

interface ITargetPictureFormData {
  productId: string;
  image: File | null;
  defaultContent: File | null;
}

export default function TargetCreate() {
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
    console.log("result:", result);
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
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={32}
                          height={32}
                          className="rounded-md object-cover"
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
