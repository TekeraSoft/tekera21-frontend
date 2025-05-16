import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { SellerReportsDateRangePicker } from "@/components/seller-components/seller-reports/SellerReportsDateRangePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  ChevronRight,
  Download,
  Info,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function SellerReportsHomePage() {
  return (
    <SellerInnerContainer>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Genel Performansım</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Bugünkü Net Cirom:
                </div>

                <div className="text-xs text-muted-foreground">0 ₺</div>
              </div>
              <div className="text-4xl font-bold mt-2">0 ₺</div>
              <div className="text-sm text-muted-foreground mt-2">
                Dünkü Net Cirom: 0 ₺
              </div>

              <div className="h-[150px] w-full bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
                <span className="text-muted-foreground">
                  Günlük Ciro Grafiği
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Tabs defaultValue="bugun" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="bugun">Bugün</TabsTrigger>
                    <TabsTrigger value="dun">Dün</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Toplam Görüntülenme
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold">32</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  %3.23
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  Raporu İncele
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Net Sipariş Adedi</div>
                  </div>
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">%0</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  Siparişleri Gör
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Net Satış Adedi</div>
                  </div>
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">%0</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  Raporu İncele
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Satışa Dönüş Oranı
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold">%0</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">%0</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  %0
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Büyüme Önerileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="font-medium">Kupon Oluştur</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="font-medium">İndirim Oluştur</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-50 rounded-full">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="font-medium">Stok Güncelle</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="font-medium">Ürün İçeriği Güncelle</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Raporlar</h2>
          <div className="space-y-2">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 rounded-full">
                    <BarChart className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="font-medium">Satış & Operasyon Raporları</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 rounded-full">
                    <BarChart className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="font-medium">Satış Artırıcı Raporlar</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 rounded-full">
                    <BarChart className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="font-medium">Değerlendirmelerim</div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Temel Metriklerim</h2>
            <div className="text-sm text-muted-foreground">
              Son Güncelleme: 14/05/2025 05:50
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SellerReportsDateRangePicker
              defaultValue={{
                from: new Date(2025, 4, 8),
                to: new Date(2025, 4, 14),
              }}
            />
            <Button variant="outline">Mega Mayıs</Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Excel İle İndir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Net Ciro</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 border-orange-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                </Badge>
              </div>
              <div className="text-xl font-bold mt-2">2.112 ₺</div>
              <div className="text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                %122.20
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Net Satış Adedi</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 border-orange-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                </Badge>
              </div>
              <div className="text-xl font-bold mt-2">1</div>
              <div className="text-xs text-red-600 mt-1">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                %100.00
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Net Sipariş Adedi</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 border-orange-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                </Badge>
              </div>
              <div className="text-xl font-bold mt-2">1</div>
              <div className="text-xs text-red-600 mt-1">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                %100.00
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Ortalama Komisyon Oranı
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </div>
              <div className="text-xl font-bold mt-2">%16.7</div>
              <div className="text-xs text-muted-foreground mt-1">%0</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Ortalama Sipariş Tutarı
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </div>
              <div className="text-xl font-bold mt-2">3.300 ₺</div>
              <div className="text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                %94.21
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Toplam Görüntülenme</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </div>
              <div className="text-xl font-bold mt-2">771</div>
              <div className="text-xs text-red-600 mt-1">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                %52.98
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">İptal Oranı</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </div>
              <div className="text-xl font-bold mt-2">%0</div>
              <div className="text-xs text-muted-foreground mt-1">%0</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm">Net Ciro</span>
          <div className="w-3 h-3 rounded-full bg-blue-500 ml-4"></div>
          <span className="text-sm">Net Satış Adedi</span>
          <div className="ml-auto text-sm text-muted-foreground">
            Sayfa 2 / 9
            <Button variant="link" size="sm" className="ml-2">
              Temizle
            </Button>
          </div>
        </div>

        <div className="h-[200px] w-full bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
          <span className="text-muted-foreground">Metrik Grafiği</span>
        </div>
      </div>
    </SellerInnerContainer>
  );
}
