"use client";

import { SellerHeLCreateTicketSenderInfoCard } from "@/components/seller-components/help/SellerHeLCreateTicketSenderInfoCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";

// Konu seçenekleri
const subjects = [
  { id: "urun", label: "ÜRÜN" },
  { id: "operasyon", label: "OPERASYON" },
  { id: "siparis", label: "SİPARİŞ" },
  { id: "teknik", label: "TEKNİK DESTEK" },
  { id: "diger", label: "DİĞER" },
];

const formSchema = z.object({
  talepNo: z.string().optional(),
  siparisNo: z.string().optional(),
  konu: z.string().min(1, { message: "Lütfen bir konu seçin" }),
  aciklama: z
    .string()
    .min(10, { message: "Açıklama en az 10 karakter olmalıdır" }),
  olusturmaTarihi: z.preprocess(
    (val) => {
      if (val instanceof Date) return val;
      if (typeof val === "string" && val.trim() !== "") return new Date(val);
      return undefined;
    },
    z
      .date({ message: "Geçerli bir tarih girin" })
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Lütfen bir tarih seçin",
      })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportTicketForm() {
  const { SellerCompanyInfo } = useAppSelector((state) => state.SellerCompany);
  const { userInfo: user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form tanımı
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      talepNo: "",
      siparisNo: "",
      konu: "",
      aciklama: "",
      olusturmaTarihi: new Date(),
    },
  });
  // Form gönderimi
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Burada normalde bir API çağrısı yapılacak
      console.log("Form verileri:", data);
      console.log("Kullanıcı bilgileri:", user);

      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Destek talebi oluşturuldu",
        description: `Talep numarası: ${data.talepNo}`,
      });

      // Formu sıfırla
      form.reset({
        talepNo: `TLP${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        siparisNo: "",
        konu: "",
        aciklama: "",
        olusturmaTarihi: new Date(),
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Hata",
        description: "Destek talebi oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  console.log(SellerCompanyInfo);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary underline underline-offset-8 flex gap-1 justify-start items-center">
            Talep Oluştur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sender Info Card Start */}

              {SellerCompanyInfo && (
                <SellerHeLCreateTicketSenderInfoCard
                  user={user}
                  SellerCompanyInfo={SellerCompanyInfo}
                />
              )}

              {/* Sender Info Card End */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="siparisNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sipariş Numarası</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sipariş numarası (opsiyonel)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="konu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konu</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Konu seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <FormField
                control={form.control}
                name="aciklama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Destek talebinizi detaylı bir şekilde açıklayın"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-between px-0">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Temizle
                </Button>
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor
                    </>
                  ) : (
                    "Destek Talebi Oluştur"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
