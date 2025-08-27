"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  Tag,
  Percent,
  FileImage,
  Save,
  X,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { createCampaign } from "@/app/actions/server/campaign.actions";
import { campaignTypes, discountTypes } from "@/constants/campaign";
import { cn } from "@/lib/utils";

export const campaignSchema = z
  .object({
    name: z.string().min(1, "Kampanya adı zorunludur"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    discountValue: z.string().optional(), // koşullu zorunlu olacak
    discountType: z.string().optional(), // koşullu zorunlu olacak
    campaignType: z.string().min(1, "Kampanya tipi seçilmelidir"),
    startDate: z.string().min(1, "Başlangıç tarihi zorunludur"),
    endDate: z.string().min(1, "Bitiş tarihi zorunludur"),
    buyX: z.string().optional(),
    buyY: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.campaignType === "BUYXGETY") {
      // buyX ve buyY zorunlu
      if (!data.buyX || data.buyX.trim() === "") {
        ctx.addIssue({
          path: ["buyX"],
          code: z.ZodIssueCode.custom,
          message: "buyX alanı zorunludur",
        });
      }
      if (!data.buyY || data.buyY.trim() === "") {
        ctx.addIssue({
          path: ["buyY"],
          code: z.ZodIssueCode.custom,
          message: "buyY alanı zorunludur",
        });
      }
    } else if (data.campaignType !== "FREESHIPPING") {
      // diğer campaign tiplerinde discountValue ve discountType zorunlu
      if (!data.discountValue || data.discountValue.trim() === "") {
        ctx.addIssue({
          path: ["discountValue"],
          code: z.ZodIssueCode.custom,
          message: "İndirim değeri alanı zorunludur",
        });
      }
      if (!data.discountType || data.discountType.trim() === "") {
        ctx.addIssue({
          path: ["discountType"],
          code: z.ZodIssueCode.custom,
          message: "İndirim tipi alanı zorunludur",
        });
      }
    }
  })
  .transform((data) => {
    // validation geçtiyse campaignType BUYXGETY için discountType'ı fixle
    if (data.campaignType === "BUYXGETY") {
      return { ...data, discountType: "NO_VALUE", discountValue: "0" };
    }
    if (data.campaignType === "FREESHIPPING") {
      return { ...data, discountType: "NO_VALUE", discountValue: "0" };
    }
    return data;
  });

type CampaignFormData = z.infer<typeof campaignSchema>;

function App() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      discountType: "",
      discountValue: "0",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");
  };

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);

    const formData = new FormData();

    if (watch("campaignType") === "BUYXGETY") {
      formData.append("buyX", data.buyX || "");
      formData.append("buyY", data.buyY || "");
    }

    formData.append("discountValue", data.discountValue || "");
    formData.append("discountType", data.discountType || "");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("campaignType", data.campaignType);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    if (selectedFile) {
      formData.append("campaignImage", selectedFile);
    } else {
      toast({
        title: "Hata",
        description: "Kampanya resmi yüklenmelidir.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const { success, message } = await createCampaign(formData);

    if (success) {
      toast({
        title: "Başarılı",
        description: "Kampanya başarıyla oluşturuldu.",
        variant: "default",
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: "Hata",
        description: message || "Kampanya oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  console.log("errors", errors);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                <Tag size={32} />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">
                Yeni Kampanya Oluştur
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Müşterileriniz için özel kampanya ve indirimler oluşturun. Tüm
              detayları doldurun ve kampanyanızı hemen yayınlayın.
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
              <CardTitle className="text-white text-xl">
                Kampanya Detayları
              </CardTitle>
              <CardDescription className="text-white/90">
                Aşağıdaki formu doldurarak yeni kampanyanızı oluşturun
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Kampanya Adı */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Kampanya Adı *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Örn: SEPETTE 150"
                      {...register("name")}
                      className="h-11"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Kampanya Tipi */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Kampanya Tipi *
                    </Label>
                    <Select
                      value={watch("campaignType")}
                      onValueChange={(value) => setValue("campaignType", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Kampanya tipini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.campaignType && (
                      <p className="text-sm text-red-500">
                        {errors.campaignType.message}
                      </p>
                    )}
                  </div>

                  {/* İndirim Tipi */}
                  {!(
                    watch("campaignType") === "BUYXGETY" ||
                    watch("campaignType") === "FREESHIPPING"
                  ) ? (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          İndirim Tipi *
                        </Label>
                        <Select
                          value={watch("discountType")}
                          onValueChange={(value) =>
                            setValue("discountType", value)
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="İndirim tipini seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {discountTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.discountType && (
                          <p className="text-sm text-red-500">
                            {errors.discountType.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="discountValue"
                          className="text-sm font-semibold text-gray-700"
                        >
                          İndirim Değeri *
                        </Label>
                        <div className="relative">
                          {watch("discountType") === "PERCENT" && (
                            <Percent
                              className="absolute left-3 top-3.5 text-gray-400"
                              size={18}
                            />
                          )}

                          <Input
                            id="discountValue"
                            type="number"
                            placeholder="150"
                            {...register("discountValue")}
                            className={cn(
                              "h-11",
                              watch("discountType") === "PERCENT" && "pl-10"
                            )}
                          />
                        </div>
                        {errors.discountValue && (
                          <p className="text-sm text-red-500">
                            {errors.discountValue.message}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    !(watch("campaignType") === "FREESHIPPING") && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor="discountValue"
                            className="text-sm font-semibold text-gray-700"
                          >
                            X Al *
                          </Label>
                          <div className="relative">
                            <Input
                              id="buyX"
                              type="number"
                              placeholder="2"
                              {...register("buyX")}
                              className="h-11"
                            />
                          </div>
                          {errors.buyX && (
                            <p className="text-sm text-red-500">
                              {errors.buyX.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="discountValue"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Y Öde *
                          </Label>
                          <div className="relative">
                            <Input
                              id="buyY"
                              type="number"
                              placeholder="1"
                              {...register("buyY")}
                              className="h-11"
                            />
                          </div>
                          {errors.buyY && (
                            <p className="text-sm text-red-500">
                              {errors.buyY.message}
                            </p>
                          )}
                        </div>
                      </>
                    )
                  )}
                  {/* İndirim Değeri */}

                  {/* Başlangıç Tarihi */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="startDate"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Başlangıç Tarihi *
                    </Label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={18}
                      />
                      <Input
                        id="startDate"
                        type="datetime-local"
                        {...register("startDate")}
                        className="pl-10 h-11"
                      />
                    </div>
                    {errors.startDate && (
                      <p className="text-sm text-red-500">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  {/* Bitiş Tarihi */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Bitiş Tarihi *
                    </Label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={18}
                      />
                      <Input
                        id="endDate"
                        type="datetime-local"
                        {...register("endDate")}
                        className="pl-10 h-11"
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-sm text-red-500">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Açıklama */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Kampanya Açıklaması *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Sepetinize eklediğiniz antalaşmalı firmaların ürünleri ile bütçenize 150 TL tasarruf sağlayın..."
                    {...register("description")}
                    rows={4}
                    className="resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Kampanya Görseli */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Kampanya Görseli
                  </Label>

                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Kampanya görseli önizleme"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={removeImage}
                        className="absolute top-2 right-2"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-gray-100">
                          <Upload className="text-gray-400" size={32} />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium mb-1">
                            Görsel yüklemek için tıklayın
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG veya JPEG (Max. 5MB)
                          </p>
                        </div>
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full max-w-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Kampanya Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Save size={20} className="mr-2" />
                        Kampanya Oluştur
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
