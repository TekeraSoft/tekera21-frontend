"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Info, Star, TrendingUp } from "lucide-react";

const SellerRecommendationsCard = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Size Özel Önerilerimiz
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="w-full flex flex-wrap lg:grid lg:grid-cols-3 rounded-b border-b bg-transparent h-auto p-0">
            <TabsTrigger
              value="growth"
              className="rounded-none data-[state=active]:border-b data-[state=active]:border-rose-500 data-[state=active]:shadow-none py-2 text-sm font-medium"
            >
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Büyüme Önerileri
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="rounded-none data-[state=active]:border-b data-[state=active]:border-rose-500 data-[state=active]:shadow-none py-2 text-sm font-medium"
            >
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-purple-500" />
                Gelişim Görevleri
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="promotion"
              className="rounded-none data-[state=active]:border-b data-[state=active]:border-rose-500 data-[state=active]:shadow-none py-2 text-sm font-medium"
            >
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-orange-500" />
                Promosyon ve Fiyatlandırma
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Growth Recommendations Tab */}
          <TabsContent value="growth" className="mt-0">
            <div className="divide-y">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-sm">
                          tekera21 Avantaj Ürünleri
                        </span>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">
                        Çok Değerli Ürün Kolu Şifon Pembe Gömlek
                      </p>
                      <p className="text-xs text-gray-500">
                        Ürün Kodu: TY2345678912345678912345
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-sm">
                          Stok Güncelle
                        </span>
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium line-clamp-2">
                        Piliseli Mini Krem Etek
                      </p>
                      <p className="text-xs text-gray-500">
                        Barkod: 1234567890
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-sm">
                          İndirim Oluştur
                        </span>
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium line-clamp-2">
                        Yüksek Bel Pileli Pudra Şorgorip Taşlı Şort Kot Pantolon
                      </p>
                      <p className="text-xs text-gray-500">
                        Ürün Kodu: TY2345678912345678912345
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full text-sm">
                Önerileri Gör
              </Button>
            </div>
          </TabsContent>

          {/* Development Tasks Tab */}
          <TabsContent value="development" className="mt-0">
            <div className="divide-y">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-rose-500">
                        Zirveye Ulaş - Görev 3: 750 TL Reklam Bakiyesi Harca
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Görev 2 tamamlandı ve son göreve geldiniz. 750 TL
                      değerinde reklam bakiyesi harcayarak ürünlerinizi
                      rakiplerinizden bir adım öne çıkarın ve satışları
                      maksimize edin.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">0 / 1 Görev</span>
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-sm">
                        Aktif
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-rose-500">
                        Mega Mayıs'da Fiyatlandırma Sayfasını Ziyaret Edin!
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Fiyatlandırma sayfasını kolayca kullanarak ürünlerinize
                      %20'e kadar artış yaplamendığınız görür müydünüz?
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">0 / 1 Görev</span>
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-sm">
                        Yeni
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-rose-500">
                        Mega Mayıs'da Flaş Ürünlere Hemen Katılın, Öne Çıkın!
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Ürünlerinizi Flaş Ürünlere Dahil Ederek Satışlarınızı 2
                      Kata Kadar Artırabilirsiniz.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">0 / 1 Görev</span>
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-sm">
                        Yeni
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full text-sm">
                Görevleri Gör
              </Button>
            </div>
          </TabsContent>

          {/* Promotion and Pricing Tab */}
          <TabsContent value="promotion" className="mt-0">
            <div className="divide-y">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-sm">
                        Flaş Ürün
                      </span>
                    </div>
                    <p className="text-sm font-medium line-clamp-2">
                      Çilek Desenli Uzun Kolu Şifon Pembe Gömlek
                    </p>
                    <p className="text-xs text-gray-500">Ürün Kodu: 2876543</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        Avantajlı Ürün Etiketi Kazan
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-sm">
                        Avantajlı Ürün
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Pul İşlemeli Tablo Kot Detaylı Atlaş - 14YKU186
                    </p>
                    <p className="text-xs text-gray-500">Barkod: 5.543.197.1</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        tekera21'a Hoşgeldiniz! 1000 TL'ye 100 TL İndirim - %50
                        tekera21 Karşılamalı
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-sm">
                        Kampanya Detayları
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Kampanyaya katılarak ürünleriniz için belirlendiğiniz ürün
                      fiyatının belirtilen oranda indirimini tekera21 karşılar.
                    </p>
                    <p className="text-xs text-gray-500">
                      Katılım Koşulu: Butikler Fiyatı veya Daha Düşük
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3" />
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full text-sm">
                Önerileri Gör
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SellerRecommendationsCard;
