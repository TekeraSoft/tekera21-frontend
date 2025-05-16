"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/AuthContext";

import { toast } from "@/hooks/use-toast";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/schemas/SellerUserProfileScema";
import { setIsEditing } from "@/store/generalSlices/formControlSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil, Upload, User } from "lucide-react";
import { useForm } from "react-hook-form";

function SellerUserProfileTab() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAuthContext();
  const { SellerCompanyInfo } = useAppSelector((state) => state.SellerCompany);
  const { isEditing } = useAppSelector((state) => state.formControl);

  // Profil resmi yükleme işlemi
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Gerçek uygulamada buraya upload işlemi yazılır

      profileForm.setValue("image", imageUrl);
      toast({
        title: "Profil resmi güncellendi",
        description: "Profil resminiz başarıyla güncellendi.",
      });
    }
  }

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
      image: userInfo?.image || "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log(data);
    dispatch(setIsEditing(false));
    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  }

  const roleTranslations: Record<string, string> = {
    orders: "Siparişler",
    products: "Ürünler",
    users: "Kullanıcılar",
    shipping: "Kargo",
    analytics: "Analitik",
    customers: "Müşteriler",
    seller: "Satıcı",
    sellerSuperAdmin: "Mağaza Yöneticisi",
    user: "Kullanıcı",
  };

  console.log(SellerCompanyInfo);
  console.log(userInfo);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Kullanıcı Bilgileri - lg: 2/5, md: 1/2, sm: 1/1 */}
        <Card className="lg:col-span-2 md:col-span-1 col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Hesap detaylarınızı görüntüleyin ve düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-2 border-gray-200">
                <AvatarImage
                  src={userInfo?.image || "/placeholder.svg"}
                  alt={userInfo?.name}
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              {isEditing ? (
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <Input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="p-1 absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full cursor-pointer">
                  <Pencil
                    className="w-4 h-4"
                    onClick={() => dispatch(setIsEditing(true))}
                  />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold">{userInfo?.name}</h3>
            <p className="text-gray-500 text-sm">{userInfo?.email}</p>

            <div className="mt-4 text-sm text-gray-500">
              <p>Üyelik Başlangıcı: {userInfo?.memberSince}</p>
            </div>
          </CardContent>
        </Card>

        {/* Mağaza Bilgileri - lg: 3/5, md: 1/2, sm: 1/1 */}
        <Card className="lg:col-span-3 md:col-span-1 col-span-1">
          <CardHeader>
            <CardTitle>Mağaza Bilgileri</CardTitle>
            <CardDescription>
              Mağanızla ilgili bilgileri görüntüleyin ve düzenleyin.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            {/* Logo */}
            <Avatar className="w-20 h-20 border">
              <AvatarImage
                src={SellerCompanyInfo?.logo}
                alt={SellerCompanyInfo?.name}
              />
              <AvatarFallback>MGZ</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-3 w-full">
              {/* Mağaza adı ve email */}
              <div>
                <h2 className="text-lg font-semibold">
                  {SellerCompanyInfo?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {SellerCompanyInfo?.email}
                </p>
              </div>

              {/* Statü, puan, takipçi */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 items-center">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Durum:</span>
                  <Badge
                    variant={
                      SellerCompanyInfo?.isActive ? "default" : "outline"
                    }
                  >
                    {SellerCompanyInfo?.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-medium">Skor:</span>
                  <span>{SellerCompanyInfo?.score}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-medium">Takipçi:</span>
                  <span>{SellerCompanyInfo?.follower}</span>
                </div>
              </div>

              {/* Roller */}
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Mağaza Rolleriniz:</h2>
                <div className="flex flex-wrap gap-2">
                  {userInfo.role.map((role: string, index: number) => (
                    <Badge key={index} variant="square">
                      {roleTranslations[role] || role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Kişisel bilgilerinizi güncelleyin</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(setIsEditing(!isEditing))}
            className="flex items-center gap-1"
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" /> İptal
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" /> Düzenle
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  disabled={!isEditing}
                  {...profileForm.register("name")}
                />
                {profileForm.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={!isEditing}
                  {...profileForm.register("email")}
                />
                {profileForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {profileForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  disabled={!isEditing}
                  {...profileForm.register("phone")}
                />
                {profileForm.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {profileForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  disabled={!isEditing}
                  {...profileForm.register("address")}
                />
                {profileForm.formState.errors.address && (
                  <p className="text-sm text-red-500">
                    {profileForm.formState.errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <Button type="submit" className="mt-4">
                Değişiklikleri Kaydet
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SellerUserProfileTab;
