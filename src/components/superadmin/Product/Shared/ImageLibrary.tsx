import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UseFormWatch } from "react-hook-form";
import { TProductFormData } from "@/types/ProductFormData";
import Resizer from "react-image-file-resizer";
import { Camera, ImageIcon, Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface IProps {
  showMediaLibrary: boolean;
  setShowMediaLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  variationIndex: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
  imageName: string;
  watch: UseFormWatch<TProductFormData>;
  handleDeleteImages:
    | ((url: string, variationIndex: number) => void)
    | undefined;
}

const ImageLibrary = ({
  setShowMediaLibrary,
  showMediaLibrary,
  variationIndex,
  images,
  onImagesChange,
  imageName,
  watch,
  handleDeleteImages,
}: IProps) => {
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
      console.log("imageName", imageName);
      onImagesChange([...images, reNamedImage]);
    } catch (error) {
      console.error("Resim küçültme hatası:", error);
    }
  };

  const removeImage = (imageIndex: number) => {
    onImagesChange(images.filter((_, i) => i !== imageIndex));
  };
  return (
    <div className="text-center w-full h-full">
      <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Camera className="h-8 w-8" />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            {/* Upload Area */}
            <Card className="mb-4">
              <CardContent className="p-4">
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
              </CardContent>
            </Card>

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto">
              {images.length === 0 &&
              watch(`variants.${variationIndex}.images`).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <ImageIcon className="h-16 w-16 mb-4" />
                  <p className="text-lg font-medium">
                    Henüz bu varyant için bir fotoğraf eklemediniz.
                  </p>
                  <p className="text-sm">İlk fotoğrafınızı ekleyin.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Yüklenen fotoğraflar (
                      {images.length +
                        watch(`variants.${variationIndex}.images`).length}
                      )
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((file, imageIndex) => (
                          <div key={imageIndex} className="relative group">
                            <img
                              src={
                                URL.createObjectURL(file) || "/placeholder.svg"
                              }
                              alt={`Stock ${variationIndex + 1} - Image ${
                                imageIndex + 1
                              }`}
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
                    {watch(`variants.${variationIndex}.images`).length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {watch(`variants.${variationIndex}.images`).map(
                          (url) => (
                            <div key={url} className="relative group">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_BASE_URL + url
                                }
                                alt={url}
                                className="w-full h-16 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteImages?.(url, variationIndex)
                                }
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-2 w-2" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {images.length > 0 && (
                      <p className="text-xs text-gray-600">
                        {images.length} image(s) uploaded
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Input
        id={`stock-images-${variationIndex}`}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageLibrary;
