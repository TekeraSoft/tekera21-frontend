import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { ISellerFormData } from ".";

const AddressManager = () => {
  const { register, watch, control } = useFormContext<ISellerFormData>();

  const watchedData = watch();

  const { append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "address", // unique name for your Field Array
  });

  return watchedData.address.map((address, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="country">Ülke</Label>
        <Controller
          name={`address.${index}.country`}
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Ülke seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Turkey">Türkiye</SelectItem>
                <SelectItem value="Germany">Almanya</SelectItem>
                <SelectItem value="France">Fransa</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Şehir</Label>
        <Input
          id="city"
          {...register(`address.${index}.city`)}
          placeholder="Şehir giriniz"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Mahalle/Sokak</Label>
        <Input
          id="street"
          {...register(`address.${index}.street`)}
          placeholder="Mahalle/Sokak giriniz"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">Posta Kodu</Label>
        <Input
          id="postalCode"
          {...register(`address.${index}.postalCode`)}
          placeholder="Posta kodu giriniz"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buildNo">Bina No</Label>
        <Input
          id="buildNo"
          {...register(`address.${index}.buildNo`)}
          placeholder="Bina numarası"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="doorNumber">Kapı No</Label>
        <Input
          id="doorNumber"
          {...register(`address.${index}.doorNumber`)}
          placeholder="Kapı numarası"
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="detailAddress">Detaylı Adres</Label>
        <Textarea
          id="detailAddress"
          {...register(`address.${index}.detailAddress`)}
          placeholder="Detaylı adres bilgilerini giriniz"
          rows={3}
        />
      </div>
    </div>
  ));
};

export default AddressManager;
