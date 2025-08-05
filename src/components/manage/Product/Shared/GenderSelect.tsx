import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductFormData } from "@/types/ProductFormData";
import { Controller, useFormContext } from "react-hook-form";
import { genders } from "./Data/Genders";

const GenderSelect = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Cinsiyet *</Label>

      <Controller
        control={control}
        name="tags"
        rules={{
          validate: (value) => {
            if (!value || value.length === 0) {
              return "Cinsiyet seçimi zorunlu";
            }
            return true;
          },
        }}
        render={({ field }) => {
          const selectedValue =
            watch("tags").find((field) => genders.includes(field.value))
              ?.value || "";

          return (
            <Select
              value={selectedValue}
              onValueChange={(value) => {
                field.onChange([{ value }]);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Cinsiyet seçin"
                  // ✅ Burası önemli: SelectValue kendi value prop'unu almaz, Select parent'ından gelir.
                />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />

      {errors.tags && (
        <p className="text-sm text-red-500">{errors.tags.message}</p>
      )}
    </div>
  );
};

export default GenderSelect;
