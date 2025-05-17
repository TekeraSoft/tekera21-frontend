import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { SellerReportsDateRangePicker } from "@/components/seller-components/seller-reports/SellerReportsDateRangePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Download, HelpCircle } from "lucide-react";
import Image from "next/image";

export default function SellerFavoritesAndViewsPage() {
  return (
    <SellerInnerContainer>
      <div className="flex items-center gap-2 mb-6">
        <SellerReportsDateRangePicker
          defaultValue={{
            from: new Date(2025, 4, 8),
            to: new Date(2025, 4, 14),
          }}
        />

        <Input
          type="text"
          placeholder="Aramak için model kodu giriniz..."
          className="h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
        />

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tüm Kategoriler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            <SelectItem value="abiye">Abiye & Mezuniyet</SelectItem>
            <SelectItem value="other">Diğer Kategoriler</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tüm Markalar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Markalar</SelectItem>
            <SelectItem value="arzuamber">Arzuamber</SelectItem>
            <SelectItem value="other">Diğer Markalar</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex gap-2">
          <Button variant="outline">Temizle</Button>
          <Button>Filtrele</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Satış Hunisi
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">
                  Toplam Görüntülenme Sayısı:
                </div>
                <div className="text-2xl font-bold mt-1">771</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">
                  Satıcı Görüntülenme Sayısı:
                </div>
                <div className="text-2xl font-bold mt-1">771</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">
                  Sepete Eklenme Sayısı:
                </div>
                <div className="text-2xl font-bold mt-1">8</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">
                  Brüt Sipariş Adedi:
                </div>
                <div className="text-2xl font-bold mt-1">1</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-[200px] w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-muted-foreground">Satış Hunisi Grafiği</span>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Favori & Görüntülenme Raporu
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Tabloyu Özelleştir
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Excel İle İndir
              </Button>
            </div>
          </div>

          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Ürün Bilgileri</TableHead>
                <TableHead className="text-right">
                  Toplam Görüntülenme Sayısı
                </TableHead>
                <TableHead className="text-right">
                  Aktif Favori Sayısı
                </TableHead>
                <TableHead className="text-right">
                  Satıcı Görüntülenme Sayısı
                </TableHead>
                <TableHead className="text-right">
                  Sepete Eklenme Sayısı
                </TableHead>
                <TableHead className="text-right">Satışa Dönüş Oranı</TableHead>
                <TableHead className="text-right">Brüt Ciro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-muted/30">
                <TableCell colSpan={7} className="font-medium">
                  Tüm Seçenekler
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=80&width=64"
                        width={64}
                        height={80}
                        alt="Ürün"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        ARZUAMBER MODA Tüy Ve Taş Detaylı Abiye
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Model Kodu: TYCD726FSD7A70524YBD57B45
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Renk: Mavi
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">9</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">9</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">%11.11</TableCell>
                <TableCell className="text-right">3.300 ₺</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=80&width=64"
                        width={64}
                        height={80}
                        alt="Ürün"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        ARZUAMBER MODA Bel Lastikli Pantolon
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Model Kodu: TYC4515387075352F5520DC000
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Renk: Haki
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">%0</TableCell>
                <TableCell className="text-right">0 ₺</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="flex min-w-56 justify-start gap-2  items-center ">
              <p className="text-sm text-muted-foreground font-bold">
                Her Sayfada
              </p>
              <Select defaultValue="20">
                <SelectTrigger className="max-w-36 h-8 ">
                  <SelectValue placeholder="20 Ürün" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Ürün</SelectItem>
                  <SelectItem value="20">20 Ürün</SelectItem>
                  <SelectItem value="50">50 Ürün</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sayfaya Git</span>
              <input
                type="number"
                className="w-16 h-8 rounded-md border border-input px-3 py-1 text-sm"
                defaultValue={1}
                min={1}
              />
              <div className="flex">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerInnerContainer>
  );
}
