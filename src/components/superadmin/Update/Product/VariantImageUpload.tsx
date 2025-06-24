import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import React from "react";
import Resizer from "react-image-file-resizer";
import { ProductFormData } from "./ProductUpdate";
import { UseFormWatch } from "react-hook-form";

export default function VariantImageUpload({
  variationIndex,
  images,
  onImagesChange,
  imageName,
  watch,
  handleDeleteImages,
}: {
  variationIndex: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
  imageName: string;
  watch: UseFormWatch<ProductFormData>;
  handleDeleteImages: (url: string, variationIndex: number) => void;
}) {
  const resizeImage = (file: File) => {
    const fileResized = new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        920, // ✅ Genişlik
        1840, // ✅ Yükseklik
        "WEBP", // ✅ Format (PNG, WEBP de olabilir)
        100, // ✅ Kalite (0-100 arasında)
        0, // ✅ Rotasyon
        (resizedFile) => {
          // Ensure resizedFile is a Blob or File, not a ProgressEvent
          if (resizedFile instanceof Blob || resizedFile instanceof File) {
            resolve(new File([resizedFile], file.name, { type: file.type }));
          } else if (
            resizedFile &&
            typeof resizedFile === "object" &&
            "target" in resizedFile &&
            (resizedFile as ProgressEvent<FileReader>).target?.result
          ) {
            // If it's a ProgressEvent, extract the result as a Blob
            const result = (resizedFile as ProgressEvent<FileReader>).target
              ?.result;
            if (result instanceof ArrayBuffer) {
              resolve(new File([result], file.name, { type: file.type }));
            } else if (typeof result === "string") {
              // If result is a base64 string, convert to Blob
              const arr = result.split(",");
              const mime = arr[0].match(/:(.*?);/)?.[1] || file.type;
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              resolve(new File([u8arr], file.name, { type: mime }));
            } else {
              resolve(file);
            }
          } else {
            resolve(file);
          }
        },
        "file" // ✅ Çıktıyı doğrudan File olarak al
      );
    });
    return fileResized as Promise<File>;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    const file = event.target.files![0];
    try {
      const resizedImage = await resizeImage(file);
      // Check if the image already exist

      const reNamedImage = new File([resizedImage], imageName);
      // console.log("imageName", imageName);
      onImagesChange([...images, reNamedImage]);
    } catch (error) {
      console.error("Resim küçültme hatası:", error);
    }
  };

  const removeImage = (imageIndex: number) => {
    onImagesChange(images.filter((_, i) => i !== imageIndex));
  };

  return (
    <div className="space-y-2 mt-3">
      <Label className="text-xs font-medium">Variant Images</Label>

      <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
        <div className="text-center">
          <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
          <Label
            htmlFor={`stock-images-${variationIndex}`}
            className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-500"
          >
            Upload images
          </Label>
          <Input
            id={`stock-images-${variationIndex}`}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      </div>

      {watch(`variants.${variationIndex}.images`).length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {watch(`variants.${variationIndex}.images`).map((url) => (
            <div key={url} className="relative group">
              <img
                src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + url}
                alt={url}
                className="w-full h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleDeleteImages(url, variationIndex)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-2 w-2" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((file, imageIndex) => (
            <div key={imageIndex} className="relative group">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Stock ${imageIndex + 1} - Image ${imageIndex + 1}`}
                className="w-full h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(imageIndex)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-2 w-2" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-600">
          {images.length} image(s) uploaded
        </p>
      )}
    </div>
  );
}
