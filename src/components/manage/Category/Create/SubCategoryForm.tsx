"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ICategory } from "../../../../../types/AdminTypes/category";

import ImageView from "@/components/shared/ImageView";
import { createSubcategory } from "@/app/actions/server/category.actions";

interface CreateSubcategoryFormProps {
  categories: ICategory[];
}

export function CreateSubcategoryForm({
  categories,
}: CreateSubcategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>("");
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Resim boyutu 5MB'ı geçemez.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Desteklenen resim formatları: JPG, PNG, GIF, WebP.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (formRef.current) {
      const fileInput = formRef.current.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!selectedCategoryId) {
      toast({
        title: "Error",
        description: "Lütfen bir kategori seçin.",
        variant: "destructive",
      });
      return;
    }

    formData.append("categoryId", selectedCategoryId);
    setIsSubmitting(true);

    try {
      const result = await createSubcategory(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: "Alt Kategori Oluşturuldu.",
        });
        formRef.current?.reset();

        setImagePreview(null);
        setSelectedCategoryId("");
      } else {
        toast({
          title: "Error",
          description: "Alt Kategori Oluşturulamadı!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Beklenmeyen bir hata oluştu!",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const subCategories = categories.flatMap(
  //   (category) => category.subCategories || []
  // );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Alt kategori oluştur.
        </CardTitle>
        <CardDescription>
          Mevcut bir kategori altında yeni bir alt kategori oluşturun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parent-category">Ana kategori</Label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {category.image && (
                        <ImageView
                          className="h-4 w-4 rounded"
                          imageInfo={{
                            url: category.image,
                            name: category.name,
                          }}
                        />
                      )}
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory-name">Alt kategori ismi</Label>
            <Input
              id="subcategory-name"
              name="name"
              placeholder="Alt kategori ismi"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory-image">Alt kategori resmi</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="subcategory-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="cursor-pointer"
                />
              </div>
              {imagePreview && (
                <div className="relative">
                  {/* <ImageView
                    className="h-12 w-12 rounded-md object-cover border"
                    imageInfo={{
                      url: imagePreview || "/placeholder.svg",
                      name: "preview",
                    }}
                  /> */}
                  <img
                    src={imagePreview}
                    className="w-12 h-12 rounded-md object-cover border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !selectedCategoryId}
            className="w-full"
          >
            {isSubmitting ? (
              <>Creating...</>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Subcategory
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
