"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Pencil, Upload, User } from "lucide-react";
import {
  passwordFormSchema,
  PasswordFormValues,
  profileFormSchema,
  ProfileFormValues,
} from "@/schemas/SellerUserProfileScema";
import { toast } from "@/components/ui/use-toast";
import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";

export default function SellerUserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "0555 123 4567",
    address: "Kadıköy, İstanbul, Türkiye",
    bio: "Trendyol satıcısı olarak elektronik ürünler satıyorum.",
    roles: ["Satıcı", "Premium Üye"],
    memberSince: "Ocak 2022",
    profileImage: "https://fakeimg.pl/100x100",
  });

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      bio: userData.bio,
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  function onProfileSubmit(data: ProfileFormValues) {
    setUserData({
      ...userData,
      ...data,
    });
    setIsEditing(false);
    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  }

  // Handle password form submission
  function onPasswordSubmit(data: PasswordFormValues) {
    console.log(data);
    toast({
      title: "Şifre güncellendi",
      description: "Şifreniz başarıyla güncellendi.",
    });
    passwordForm.reset();
  }

  // Handle profile image upload
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        profileImage: imageUrl,
      });
      toast({
        title: "Profil resmi güncellendi",
        description: "Profil resminiz başarıyla güncellendi.",
      });
    }
  }

  return (
    <SellerInnerContainer>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with user info */}
        <div className="w-full md:w-1/3">
          <Card>
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
                    src={userData.profileImage || "/placeholder.svg"}
                    alt={userData.fullName}
                  />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <h3 className="text-xl font-bold">{userData.fullName}</h3>
              <p className="text-gray-500 text-sm">{userData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {userData.roles.map((role, index) => (
                  <Badge key={index} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Üyelik Başlangıcı: {userData.memberSince}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side with tabs */}
        <div className="w-full md:w-2/3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Güvenlik</TabsTrigger>
              <TabsTrigger value="preferences">Tercihler</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profil Bilgileri</CardTitle>
                    <CardDescription>
                      Kişisel bilgilerinizi güncelleyin
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
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
                        <Label htmlFor="fullName">Ad Soyad</Label>
                        <Input
                          id="fullName"
                          disabled={!isEditing}
                          {...profileForm.register("fullName")}
                        />
                        {profileForm.formState.errors.fullName && (
                          <p className="text-sm text-red-500">
                            {profileForm.formState.errors.fullName.message}
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

                      <div className="grid gap-2">
                        <Label htmlFor="bio">Hakkımda</Label>
                        <Textarea
                          id="bio"
                          disabled={!isEditing}
                          {...profileForm.register("bio")}
                        />
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
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik</CardTitle>
                  <CardDescription>
                    Şifrenizi değiştirin ve güvenlik ayarlarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordForm.register("currentPassword")}
                        />
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-sm text-red-500">
                            {
                              passwordForm.formState.errors.currentPassword
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...passwordForm.register("newPassword")}
                        />
                        {passwordForm.formState.errors.newPassword && (
                          <p className="text-sm text-red-500">
                            {passwordForm.formState.errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">
                          Yeni Şifre (Tekrar)
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...passwordForm.register("confirmPassword")}
                        />
                        {passwordForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {
                              passwordForm.formState.errors.confirmPassword
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="mt-4">
                      Şifreyi Güncelle
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Tercihler</CardTitle>
                  <CardDescription>
                    Bildirim ve görüntüleme tercihlerinizi yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">E-posta Bildirimleri</h4>
                        <p className="text-sm text-gray-500">
                          Yeni siparişler ve güncellemeler hakkında bildirimler
                          alın
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="email-notifications"
                          className="sr-only"
                        >
                          E-posta Bildirimleri
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Bildirimleri</h4>
                        <p className="text-sm text-gray-500">
                          Acil güncellemeler için SMS bildirimleri alın
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="sms-notifications" className="sr-only">
                          SMS Bildirimleri
                        </Label>
                        <input
                          type="checkbox"
                          id="sms-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
                        <p className="text-sm text-gray-500">
                          Hesabınızı korumak için iki faktörlü doğrulamayı
                          etkinleştirin
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="two-factor" className="sr-only">
                          İki Faktörlü Doğrulama
                        </Label>
                        <input
                          type="checkbox"
                          id="two-factor"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Tercihleri Kaydet</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SellerInnerContainer>
  );
}
