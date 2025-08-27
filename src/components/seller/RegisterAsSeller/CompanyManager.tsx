import React from "react";

import { Upload } from "lucide-react";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { MultiSelectCategory } from "@/components/seller/Product/Shared/MultiSelectCategory";
import { ISellerFormData } from ".";
import { ICategoryResponse } from "@/types/SellerTypes/CategoryTypes";
import { useAuthContext } from "@/context/AuthContext";
import ImageView from "@/components/shared/ImageView";
import { IShippingCompany } from "@/types/SellerTypes/ShippingCompanies";

const CompanyManager = ({
  categories,
  logo,
  handleSetLogo,
  shippingCompanies,
}: {
  categories: ICategoryResponse;
  logo: File | undefined;
  handleSetLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shippingCompanies: IShippingCompany[] | undefined;
}) => {
  const { userInfo } = useAuthContext();
  const { register, control, formState, watch } =
    useFormContext<ISellerFormData>();

  function flattenCategories() {
    const flatList: { id: string; name: string; image: string }[] = [];

    for (const category of categories.content) {
      // Ana kategoriyi ekle
      flatList.push({
        id: category.id,
        name: category.name,
        image: category.image,
      });

      // for (const sub of category.subCategories) {
      //   flatList.push({
      //     id: sub.id,
      //     name: `${category.name}/${sub.name}`,
      //     image: sub.image,
      //   });
      // }
    }

    return flatList;
  }

  const logoSeller = watch("logo");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {logo ? (
              <img
                className="w-full h-full rounded-full object-cover"
                src={URL.createObjectURL(logo)}
                alt="logo"
              ></img>
            ) : logoSeller ? (
              <ImageView
                imageInfo={{ url: logoSeller, name: "logo" }}
                className="w-full h-full rounded-full"
              />
            ) : (
              userInfo?.nameSurname.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <Label
              htmlFor="logo"
              className="flex outline w-max p-2 rounded-md outline-gray-300 cursor-pointer hover:bg-accent"
            >
              <Upload className="w-4 h-4 mr-2" /> Logo Değiştir
            </Label>
            <Input
              id={"logo"}
              name="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleSetLogo(e)}
            />
            {formState.errors.logo && (
              <p className="text-sm text-destructive">
                {formState.errors.logo.message}
              </p>
            )}
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
        {formState.errors.name && (
          <p className="text-sm text-destructive">
            {formState.errors.name.message}
          </p>
        )}
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="ornek@email.com"
        />
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="gsmNumber">GSM Numarası</Label>
        <Input
          id="gsmNumber"
          {...register("gsmNumber")}
          placeholder="5XX XXX XX XX"
        />
        {formState.errors.gsmNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.gsmNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alternativePhone">Alternatif Telefon</Label>
        <Input
          id="alternativePhone"
          {...register("alternativePhoneNumber")}
          placeholder="5XX XXX XX XX"
        />
        {formState.errors.alternativePhoneNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.alternativePhoneNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportPhone">Destek Telefonu</Label>
        <Input
          id="supportPhone"
          {...register("supportPhoneNumber")}
          placeholder="5XX XXX XX XX"
        />
        {formState.errors.supportPhoneNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.supportPhoneNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPersonTitle">İletişim Kişisi Ünvanı</Label>
        <Input
          id="contactPersonTitle"
          {...register("contactPersonTitle")}
          placeholder="Manager"
        />
        {formState.errors.contactPersonTitle && (
          <p className="text-sm text-destructive">
            {formState.errors.contactPersonTitle.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPersonNumber">İletişim Kişisi Telefonu</Label>
        <Input
          id="contactPersonNumber"
          {...register("contactPersonNumber")}
          placeholder="5XX XXX XX XX"
        />
        {formState.errors.contactPersonNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.contactPersonNumber.message}
          </p>
        )}
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
        {formState.errors.categoryId && (
          <p className="text-sm text-destructive">
            {formState.errors.categoryId.message}
          </p>
        )}
      </div>
      {shippingCompanies && (
        <div className="space-y-2 relative">
          <Label htmlFor={"shippingCompanyId"}>Kargo Firması Seçimi</Label>
          <Controller
            control={control}
            name={"shippingCompanies"}
            rules={{ required: "Kargo Firması seçimi zorunludur." }}
            render={({ field }) => (
              <MultiSelectCategory
                options={shippingCompanies.map((shippingCompany) => ({
                  label: shippingCompany.name,
                  value: shippingCompany.id,
                  image: "",
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
                placeholder="Kargo Firması Ara"
                emptyMessage="Kargo Firması bulunamadı."
              />
            )}
          />
          {formState.errors.shippingCompanies && (
            <p className="text-sm text-destructive">
              {formState.errors.shippingCompanies.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyManager;
