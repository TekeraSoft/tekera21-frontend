import { SellerReportsDateRangePicker } from "@/components/seller-components/seller-reports/SellerReportsDateRangePicker";
import { Button } from "@/components/ui/button";
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
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Download,
  Package,
} from "lucide-react";

export default function SellerReportsShopPage() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <SellerReportsDateRangePicker
          defaultValue={{
            from: new Date(2025, 4, 8),
            to: new Date(2025, 4, 14),
          }}
        />

        <div className="ml-auto flex gap-2">
          <Button variant="outline">Temizle</Button>
          <Button>Filtrele</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-purple-600 text-white rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">
              Mağazanızın satış ve ziyaret performansınızı inceleyelere
              aksiyonlar alın!
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Package className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">x5</span>
              </div>
              <p className="text-xs">
                Satışlarınız daha fazla değişir kazanın.
              </p>
              <Button size="sm" variant="secondary" className="mt-2 text-xs">
                Kupon Tanımla
              </Button>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Box className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">x3</span>
              </div>
              <p className="text-xs">Daha fazla satış elde edin yapın.</p>
              <Button size="sm" variant="secondary" className="mt-2 text-xs">
                Mağaza Düzenle
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mağaza Raporu</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Excel İle İndir
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Mağaza Görüntülenme Sayısı</TableHead>
              <TableHead>Toplam Tıklayıcı Sayısı</TableHead>
              <TableHead>Tıklı Ziyaretçi Sayısı</TableHead>
              <TableHead>Ziyaretçinin Ürüne Dönüş Oranı</TableHead>
              <TableHead>Ziyaretçinin Mağazaya Dönüş Oranı</TableHead>
              <TableHead>Ziyaretçi Başına Mağaza Görüntülenme Sayısı</TableHead>
              <TableHead>Mağazanın Brüt Sipariş Adedi</TableHead>
              <TableHead>Mağazanın Brüt Sipariş Adedi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>13 May 2025</TableCell>
              <TableCell>16</TableCell>
              <TableCell>
                <div>61</div>
                <div className="text-xs text-muted-foreground">
                  <div>Günlük Değişim: +1</div>
                  <div>Ziyaretçi: 5</div>
                  <div>Kayıtlı Üye: 0</div>
                </div>
              </TableCell>
              <TableCell>
                <div>10</div>
                <div className="text-xs text-muted-foreground">
                  Yeni Üyeler: 4 Kişi (40.00%)
                </div>
              </TableCell>
              <TableCell>%0.00</TableCell>
              <TableCell>%0.00</TableCell>
              <TableCell>1.60</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>12 May 2025</TableCell>
              <TableCell>14</TableCell>
              <TableCell>
                <div>61</div>
                <div className="text-xs text-muted-foreground">
                  <div>Günlük Değişim: +1</div>
                  <div>Ziyaretçi: 5</div>
                  <div>Kayıtlı Üye: 0</div>
                </div>
              </TableCell>
              <TableCell>
                <div>9</div>
                <div className="text-xs text-muted-foreground">
                  Yeni Üyeler: 4 Kişi (44.44%)
                </div>
              </TableCell>
              <TableCell>%0.00</TableCell>
              <TableCell>%0.00</TableCell>
              <TableCell>1.56</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
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
