"use client";

import { useState } from "react";
import {
  Save,
  User,
  Bell,
  Palette,
  Database,
  Globe,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function AdminConfigurationPanel() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Ayarlar kaydedildi",
        description: "Yapılandırma ayarlarınız başarıyla güncellendi.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full mx-auto px-4 mt-5">
      {/* <CardHeader>
        <CardTitle className="text-2xl">Ayarlar ve Yapılandırma</CardTitle>
        <CardDescription>
          Sistem ayarlarınızı ve yapılandırma seçeneklerinizi buradan yönetin.
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">Genel</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Kullanıcılar</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Bildirimler</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Görünüm</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Sistem</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Site Bilgileri</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Adı</Label>
                  <Input
                    id="site-name"
                    placeholder="Yönetim Paneli"
                    defaultValue="Admin Paneli"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input
                    id="site-url"
                    placeholder="https://example.com"
                    defaultValue="https://admin.example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Açıklaması</Label>
                <Textarea
                  id="site-description"
                  placeholder="Site açıklaması girin"
                  defaultValue="Şirket yönetim paneli"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">İletişim Bilgileri</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">İletişim E-posta</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">İletişim Telefon</Label>
                  <Input id="contact-phone" placeholder="+90 555 123 4567" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bölgesel Ayarlar</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Dil</Label>
                  <Select defaultValue="tr">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Dil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">İngilizce</SelectItem>
                      <SelectItem value="de">Almanca</SelectItem>
                      <SelectItem value="fr">Fransızca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Saat Dilimi</Label>
                  <Select defaultValue="europe-istanbul">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Saat dilimi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-istanbul">
                        Europe/Istanbul (UTC+3)
                      </SelectItem>
                      <SelectItem value="europe-london">
                        Europe/London (UTC+0)
                      </SelectItem>
                      <SelectItem value="america-new_york">
                        America/New_York (UTC-5)
                      </SelectItem>
                      <SelectItem value="asia-tokyo">
                        Asia/Tokyo (UTC+9)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Kullanıcı Ayarları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">Kullanıcı Kaydı</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni kullanıcıların kayıt olmasına izin ver
                    </p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-verification">
                      E-posta Doğrulama
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kullanıcıların e-posta adreslerini doğrulamasını zorunlu
                      kıl
                    </p>
                  </div>
                  <Switch id="email-verification" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">
                      İki Faktörlü Kimlik Doğrulama
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kullanıcılar için iki faktörlü kimlik doğrulamayı
                      etkinleştir
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Varsayılan Kullanıcı İzinleri
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-role">Varsayılan Rol</Label>
                  <Select defaultValue="user">
                    <SelectTrigger id="default-role">
                      <SelectValue placeholder="Rol seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Yönetici</SelectItem>
                      <SelectItem value="editor">Editör</SelectItem>
                      <SelectItem value="user">Kullanıcı</SelectItem>
                      <SelectItem value="guest">Misafir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    Oturum Zaman Aşımı (dakika)
                  </Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bildirim Ayarları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      E-posta Bildirimleri
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Sistem olayları için e-posta bildirimleri gönder
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">
                      Push Bildirimleri
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Tarayıcı push bildirimlerini etkinleştir
                    </p>
                  </div>
                  <Switch id="push-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Kritik olaylar için SMS bildirimleri gönder
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bildirim Olayları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-login">Kullanıcı Girişi</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni kullanıcı girişlerinde bildirim gönder
                    </p>
                  </div>
                  <Switch id="user-login" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">
                      Sistem Güncellemeleri
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Sistem güncellemeleri hakkında bildirim gönder
                    </p>
                  </div>
                  <Switch id="system-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="security-alerts">Güvenlik Uyarıları</Label>
                    <p className="text-sm text-muted-foreground">
                      Güvenlik olayları hakkında bildirim gönder
                    </p>
                  </div>
                  <Switch id="security-alerts" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tema Ayarları</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="color-scheme">Renk Şeması</Label>
                  <Select defaultValue="system">
                    <SelectTrigger id="color-scheme">
                      <SelectValue placeholder="Renk şeması seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Açık</SelectItem>
                      <SelectItem value="dark">Koyu</SelectItem>
                      <SelectItem value="system">Sistem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Ana Renk</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger id="primary-color">
                      <SelectValue placeholder="Ana renk seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Mavi</SelectItem>
                      <SelectItem value="green">Yeşil</SelectItem>
                      <SelectItem value="purple">Mor</SelectItem>
                      <SelectItem value="red">Kırmızı</SelectItem>
                      <SelectItem value="orange">Turuncu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Yazı Tipi Boyutu</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Yazı tipi boyutu seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Küçük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="large">Büyük</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Arayüz Ayarları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Kompakt Mod</Label>
                    <p className="text-sm text-muted-foreground">
                      Daha kompakt bir arayüz için boşlukları azalt
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animasyonlar</Label>
                    <p className="text-sm text-muted-foreground">
                      Arayüz animasyonlarını etkinleştir
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-collapsed">
                      Kenar Çubuğu Varsayılan Daraltılmış
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kenar çubuğunu varsayılan olarak daraltılmış göster
                    </p>
                  </div>
                  <Switch id="sidebar-collapsed" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sistem Bakımı</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Bakım Modu</Label>
                    <p className="text-sm text-muted-foreground">
                      Siteyi bakım moduna al
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="log-level">Günlük Seviyesi</Label>
                  <Select defaultValue="error">
                    <SelectTrigger id="log-level">
                      <SelectValue placeholder="Günlük seviyesi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Yedekleme ve Kurtarma</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Yedekleme Sıklığı</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Yedekleme sıklığı seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Saatlik</SelectItem>
                      <SelectItem value="daily">Günlük</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                      <SelectItem value="monthly">Aylık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-retention">
                    Yedek Saklama Süresi (gün)
                  </Label>
                  <Input
                    id="backup-retention"
                    type="number"
                    defaultValue="30"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">Otomatik Yedekleme</Label>
                    <p className="text-sm text-muted-foreground">
                      Otomatik yedekleme zamanlamasını etkinleştir
                    </p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Manuel Yedekleme
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Yedekleri Görüntüle
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Güvenlik Ayarları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="force-ssl">SSL Zorunlu</Label>
                    <p className="text-sm text-muted-foreground">
                      Tüm bağlantıları HTTPS'ye yönlendir
                    </p>
                  </div>
                  <Switch id="force-ssl" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">IP Kısıtlaması</Label>
                    <p className="text-sm text-muted-foreground">
                      Yönetici erişimini belirli IP adreslerine kısıtla
                    </p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed-ips">İzin Verilen IP Adresleri</Label>
                  <Textarea
                    id="allowed-ips"
                    placeholder="Her satıra bir IP adresi girin"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Varsayılanlara Sıfırla</Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <>Kaydediliyor...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Ayarları Kaydet
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
