import { PlusCircle } from "lucide-react";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISellerFormData } from ".";

const BankManager = () => {
  const { register, watch, control } = useFormContext<ISellerFormData>();
  const watchedData = watch();

  const { append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "bankAccount", // unique name for your Field Array
  });

  const addNewBankAccount = () => {
    const newBankAccount = {
      iban: "",
      accountName: "",
      bankName: "",
      isActive: false,
    };
    append(newBankAccount);
  };
  return (
    <>
      {watchedData.bankAccount?.map((account, index) => (
        <div
          key={`bank-${index}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <Label htmlFor={`bankName-${index}`}>Banka Adı</Label>
            <Controller
              name={`bankAccount.${index}.bankName`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Banka seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ziraat Bank">Ziraat Bankası</SelectItem>
                    <SelectItem value="İş Bankası">İş Bankası</SelectItem>
                    <SelectItem value="Garanti BBVA">Garanti BBVA</SelectItem>
                    <SelectItem value="Akbank">Akbank</SelectItem>
                    <SelectItem value="Yapı Kredi">Yapı Kredi</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`accountName-${index}`}>Hesap Sahibi Adı</Label>
            <Input
              id={`accountName-${index}`}
              {...register(`bankAccount.${index}.accountName`)}
              placeholder="Hesap sahibi adını giriniz"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor={`iban-${index}`}>IBAN</Label>
            <Input
              id={`iban-${index}`}
              {...register(`bankAccount.${index}.iban`)}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <Controller
                name={`bankAccount.${index}.isActive`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={`isActive-${index}`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor={`isActive-${index}`}>Bu hesap aktif</Label>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" onClick={addNewBankAccount}>
        <PlusCircle className="w-5 h-5 mr-2" /> Yeni Banka Hesabı Ekle
      </Button>
    </>
  );
};

export default BankManager;
