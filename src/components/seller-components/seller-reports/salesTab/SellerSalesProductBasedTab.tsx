import React from "react";

import { SellerReportsCountrySelector } from "../SellerReportsCountrySelector";
import { SellerReportsDateRangePicker } from "../SellerReportsDateRangePicker";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SellerSalesProductBasedTab() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <div className="flex items-center gap-2">
          <SellerReportsCountrySelector />
          <SellerReportsDateRangePicker
            defaultValue={{
              from: new Date(2025, 4, 8),
              to: new Date(2025, 4, 14),
            }}
          />
        </div>

        <Input
          type="text"
          placeholder="Model Kodu / Barkod ile Ara..."
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

        <Checkbox id="kurumsal" />
        <label htmlFor="kurumsal" className="text-sm font-medium">
          Kurumsal Satış
        </label>

        <div className="ml-auto flex gap-2">
          <Button variant="outline">Temizle</Button>
          <Button>Filtrele</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Brüt Satış</div>
                <div className="text-2xl font-bold mt-1">1 Adet</div>
              </div>
              <div className="text-xl font-bold">3.300 ₺</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground flex items-center">
                  İptaller
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold mt-1">0 Adet</div>
              </div>
              <div className="text-xl font-bold">0 ₺</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground flex items-center">
                  İadeler
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold mt-1">0 Adet</div>
              </div>
              <div className="text-xl font-bold">0 ₺</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground flex items-center">
                  Net Satış
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold mt-1 flex items-center">
                  1 Adet
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-50 text-green-600 border-green-200"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    İndirimler: -1.188 ₺
                  </Badge>
                </div>
              </div>
              <div className="text-xl font-bold">2.112 ₺</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Ürün Bazlı Satış Raporları
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Excel İle İndir
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün Bilgileri</TableHead>
              <TableHead className="text-right">Brüt Satış Adedi</TableHead>
              <TableHead className="text-right">İptal Adedi</TableHead>
              <TableHead className="text-right">İptal Oranı</TableHead>
              <TableHead className="text-right">İade Adedi</TableHead>
              <TableHead className="text-right">İade Oranı</TableHead>
              <TableHead className="text-right">Net Satış Adedi</TableHead>
              <TableHead className="text-right">Brüt Ciro</TableHead>
              <TableHead className="text-right">İndirim Tutarı</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                    <div className="text-sm text-muted-foreground">
                      Barkod: PA20HSML
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Beden: 40
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">%0.00</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">%0.00</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">3.300 ₺</TableCell>
              <TableCell className="text-right">1.188 ₺</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Detaya Git
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Her Sayfada
            <Select defaultValue="20">
              <SelectTrigger className="w-[70px] h-8 ml-2">
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
              <Button variant="outline" size="icon" className="rounded-r-none">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-l-none">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerSalesProductBasedTab;
