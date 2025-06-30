import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductFormData } from "@/types/ProductFormData";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const CurrencyAndProductType = () => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="currencyType">Para birimi *</Label>

        <Controller
          control={control}
          name="currencyType"
          rules={{ required: "Bu alan zorunludur." }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue="TRY">
              <SelectTrigger>
                <SelectValue placeholder="Para birimi seçin." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TRY">TRY</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.currencyType && (
          <p className="text-sm text-red-500">{errors.currencyType.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="productType">Ürün Tipi *</Label>
        <Controller
          control={control}
          name="productType"
          rules={{ required: "Bu alan zorunludur." }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue="PHYSICAL">
              <SelectTrigger>
                <SelectValue placeholder="Ürün tipi seçin." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHYSICAL">Fiziksel</SelectItem>
                <SelectItem value="DIGITAL">Dijital</SelectItem>
                <SelectItem value="SERVICE">Hizmet</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.productType && (
          <p className="text-sm text-red-500">{errors.productType.message}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyAndProductType;
