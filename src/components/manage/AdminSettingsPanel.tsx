"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { User, Lock, Bell, Shield, Upload } from "lucide-react";

// Form şemaları
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi girin.",
  }),
  bio: z.string().max(160).optional(),
  username: z.string().min(2, {
    message: "Kullanıcı adı en az 2 karakter olmalıdır.",
  }),
  phoneNumber: z.string().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Mevcut şifrenizi girin.",
    }),
    newPassword: z.string().min(8, {
      message: "Şifre en az 8 karakter olmalıdır.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Şifre en az 8 karakter olmalıdır.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export default function AdminSettingsPanel() {
  const [isUpdating, setIsUpdating] = useState(false);

  // Profil formu
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Özgür Yılmaz",
      email: "ozgur.yilmaz@example.com",
      bio: "Yazılım geliştirici ve teknoloji meraklısı.",
      username: "ozguryilmaz",
      phoneNumber: "+90 555 123 4567",
    },
  });

  // Şifre formu
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Profil güncelleme
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsUpdating(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      console.log(values);
      setIsUpdating(false);
      toast({
        title: "Profil güncellendi",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      });
    }, 1000);
  }

  // Şifre güncelleme
  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsUpdating(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      console.log(values);
      setIsUpdating(false);
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla güncellendi.",
      });
    }, 1000);
  }

  return (
    <Card className="w-full min-h-screen mx-auto pt-4">
      {/* <CardHeader>
        <CardTitle className="text-2xl">Hesap Ayarları</CardTitle>
        <CardDescription>Kişisel bilgilerinizi ve hesap ayarlarınızı yönetin.</CardDescription>
      </CardHeader> */}
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Şifre</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span>Bildirimler</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Güvenlik</span>
            </TabsTrigger>
          </TabsList>

          {/* Profil Sekmesi */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profil Fotoğrafı"
                  />
                  <AvatarFallback>AY</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profil Fotoğrafı</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Fotoğraf Yükle
                    </Button>
                    <Button variant="outline" size="sm">
                      Kaldır
                    </Button>
                  </div>
                </div>
              </div>

              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Ad Soyad" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kullanıcı Adı</FormLabel>
                          <FormControl>
                            <Input placeholder="Kullanıcı adı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="E-posta"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Bu e-posta adresi hesabınız ve bildirimleriniz için
                          kullanılacaktır.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon Numarası</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefon numarası" {...field} />
                        </FormControl>
                        <FormDescription>
                          Telefon numaranız güvenlik ve bildirimler için
                          kullanılabilir.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hakkımda</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Kendiniz hakkında kısa bir bilgi"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Profilinizde görünecek kısa bir biyografi. Maksimum
                          160 karakter.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Güncelleniyor..." : "Profili Güncelle"}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          {/* Şifre Sekmesi */}
          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mevcut Şifre</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yeni Şifre</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Şifreniz en az 8 karakter uzunluğunda olmalı ve özel
                        karakterler içermelidir.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifreyi Onayla</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Bildirimler Sekmesi */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">E-posta Bildirimleri</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">
                        Pazarlama E-postaları
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Yeni özellikler ve promosyonlar hakkında e-postalar
                        alın.
                      </p>
                    </div>
                    <Switch id="email-marketing" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-updates">
                        Sistem Güncellemeleri
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Sistem güncellemeleri ve değişiklikler hakkında
                        bildirimler alın.
                      </p>
                    </div>
                    <Switch id="email-updates" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-security">Güvenlik Uyarıları</Label>
                      <p className="text-sm text-muted-foreground">
                        Hesabınızla ilgili güvenlik uyarıları alın.
                      </p>
                    </div>
                    <Switch id="email-security" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Uygulama Bildirimleri</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-all">Tüm Bildirimler</Label>
                      <p className="text-sm text-muted-foreground">
                        Tüm uygulama bildirimlerini alın.
                      </p>
                    </div>
                    <Switch id="push-all" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-mentions">Bahsetmeler</Label>
                      <p className="text-sm text-muted-foreground">
                        Birisi sizi bahsettiğinde bildirim alın.
                      </p>
                    </div>
                    <Switch id="push-mentions" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-comments">Yorumlar</Label>
                      <p className="text-sm text-muted-foreground">
                        Yeni yorumlar hakkında bildirim alın.
                      </p>
                    </div>
                    <Switch id="push-comments" defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Bildirimleri Güncelle</Button>
            </div>
          </TabsContent>

          {/* Güvenlik Sekmesi */}
          <TabsContent value="security">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  İki Faktörlü Kimlik Doğrulama
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">
                      İki Faktörlü Kimlik Doğrulama
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Hesabınıza ekstra bir güvenlik katmanı eklemek için iki
                      faktörlü kimlik doğrulamayı etkinleştirin.
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Oturum Yönetimi</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Şu anda aktif olan tüm oturumlarınızı görüntüleyin ve
                    yönetin.
                  </p>
                  <Button variant="outline">Aktif Oturumları Görüntüle</Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Tüm cihazlardan çıkış yapın ve yeni oturum açmaya zorlayın.
                  </p>
                  <Button variant="outline">Tüm Oturumlardan Çıkış Yap</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hesap Erişimi</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Hesabınıza erişimi olan üçüncü taraf uygulamaları yönetin.
                  </p>
                  <Button variant="outline">Bağlı Uygulamaları Yönet</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hesap Silme</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı silmek tüm verilerinizi kalıcı olarak
                    kaldıracaktır. Bu işlem geri alınamaz.
                  </p>
                  <Button variant="destructive">Hesabımı Sil</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
