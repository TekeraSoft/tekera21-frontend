import React from "react";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISellerFormData } from ".";

const TaxManager = () => {
  const { register, formState } = useFormContext<ISellerFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="taxNumber">Vergi Numarası</Label>
        <Input
          id="taxNumber"
          {...register("taxNumber")}
          placeholder="Vergi numarasını giriniz"
        />
        {formState.errors.taxNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.taxNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="taxOffice">Vergi Dairesi</Label>
        <Input
          id="taxOffice"
          {...register("taxOffice")}
          placeholder="Vergi dairesini giriniz"
        />
        {formState.errors.taxOffice && (
          <p className="text-sm text-destructive">
            {formState.errors.taxOffice.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="merisNumber">MERSİS Numarası</Label>
        <Input
          id="merisNumber"
          {...register("merisNumber")}
          placeholder="MERSIS numarasını giriniz"
        />
        {formState.errors.merisNumber && (
          <p className="text-sm text-destructive">
            {formState.errors.merisNumber.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaxManager;
