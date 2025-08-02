import React from "react";

import { Upload } from "lucide-react";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelectCategory } from "@/components/superadmin/Product/Shared/MultiSelectCategory";
import { ISellerFormData } from ".";
import { ICategoryResponse } from "@/types/SellerTypes/CategoryTypes";

const CompanyManager = ({ categories }: { categories: ICategoryResponse }) => {
  const { register, control } = useFormContext<ISellerFormData>();

  function flattenCategories() {
    const flatList: { id: string; name: string; image: string }[] = [];

    for (const category of categories.content) {
      for (const sub of category.subCategories) {
        flatList.push({
          id: sub.id,
          name: `${category.name}/${sub.name}`,
          image: sub.image,
        });
      }
    }

    return flatList;
  }

  console.log("flattenCategories", flattenCategories());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            AM
          </div>
          <div className="flex-1">
            <Button variant="outline" size="sm" type="button">
              <Upload className="w-4 h-4 mr-2" />
              Logo Değiştir
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Firma Adı</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Firma adını giriniz"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="ornek@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gsmNumber">GSM Numarası</Label>
        <Input
          id="gsmNumber"
          {...register("gsmNumber")}
          placeholder="5XX XXX XX XX"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alternativePhone">Alternatif Telefon</Label>
        <Input
          id="alternativePhone"
          {...register("alternativePhoneNumber")}
          placeholder="5XX XXX XX XX"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportPhone">Destek Telefonu</Label>
        <Input
          id="supportPhone"
          {...register("supportPhoneNumber")}
          placeholder="5XX XXX XX XX"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPersonTitle">İletişim Kişisi Ünvanı</Label>
        <Input
          id="contactPersonTitle"
          {...register("contactPersonTitle")}
          placeholder="Manager"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPersonNumber">İletişim Kişisi Telefonu</Label>
        <Input
          id="contactPersonNumber"
          {...register("contactPersonNumber")}
          placeholder="5XX XXX XX XX"
        />
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor={"categoryId"}>Kategori</Label>
        <Controller
          control={control}
          name={"categoryId"}
          rules={{ required: "Kategori seçimi zorunlu" }}
          render={({ field }) => (
            <MultiSelectCategory
              options={flattenCategories().map((category) => ({
                label: category.name,
                value: category.id,
                image: category.image,
              }))}
              selected={
                Array.isArray(field.value)
                  ? field.value.map((item: any) =>
                      typeof item === "string"
                        ? { value: item }
                        : "value" in item
                        ? item
                        : "id" in item && item.id
                        ? { value: item.id }
                        : { value: "" }
                    )
                  : typeof field.value === "string"
                  ? [{ value: field.value }]
                  : []
              }
              onChange={field.onChange}
              placeholder="Kategori Ara"
              emptyMessage="Kategori bulunamadı."
            />
          )}
        />
      </div>
    </div>
  );
};

export default CompanyManager;
