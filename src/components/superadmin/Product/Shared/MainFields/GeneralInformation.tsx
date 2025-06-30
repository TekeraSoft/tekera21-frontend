import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TProductFormData } from "@/types/ProductFormData";
import React from "react";
import { useFormContext } from "react-hook-form";

const GeneralInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ürün Adı *</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Ürün adı zorunludur.",
            })}
            placeholder="Kalp Nakış İşlemeli Yelek"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Company Id *</Label>
          <Input
            id="companyId"
            {...register("companyId", {
              required: "Company Id is required",
            })}
            placeholder="dfc9a257-a4bc-4bc3-89ee-8727a129efd2"
          />
          {errors.slug && (
            <p className="text-sm text-red-500">{errors.companyId?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Ürün Kodu *</Label>
          <Input
            id="code"
            {...register("code", {
              required: "Ürün Kodu Zorunludur.",
            })}
            placeholder="A2991"
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="brandName">Marka İsmi *</Label>
          <Input
            id="brandName"
            {...register("brandName", {
              required: "Marka ismi zorunludur.",
            })}
            placeholder="Nike"
          />
          {errors.brandName && (
            <p className="text-sm text-red-500">{errors.brandName.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
