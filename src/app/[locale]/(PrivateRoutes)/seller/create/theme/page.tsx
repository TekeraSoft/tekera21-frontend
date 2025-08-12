"use client";
import { createNewTheme } from "@/app/actions/server/general.actions";
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
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ITargetPictureFormData {
  name: string;
  image: File | null;
}

export default function CreateThemePage() {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<ITargetPictureFormData>({
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ITargetPictureFormData) => {
    console.log("onsubmit data:", data);
    // Transform data to match the required format
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }

    const { success, message } = await createNewTheme(formData);

    if (success) {
      setLoading(false);
      toast({
        title: "Success",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Tema oluşturuldu.",
        variant: "default",
      });
    } else {
      setLoading(false);
      toast({
        title: "Error",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Teme oluşturulamadı.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema ekle</CardTitle>
          <CardDescription>
            Bu form ile ürünler için tema ekleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Selection */}

            <div className="space-y-2">
              <Label htmlFor="name">Tema ismi *</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Tema ismi zorunludur",
                })}
                placeholder="örn. fantastik"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <FileUploadEnhanced
              name="image"
              accept="image/*"
              label="Tema Fotoğrafı"
              description="PNG, JPG, GIF up to 10MB"
              icon="image"
              setFile={(file) => setValue("image", file)}
              file={watch("image") as File | null}
            />

            {/* Video Upload */}

            {/* Submit Button */}
            <Button disabled={loading} type="submit" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Tema ekle
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
