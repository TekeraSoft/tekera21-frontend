import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SellerReportsCountrySelector } from "../SellerReportsCountrySelector";
import { SellerReportsDateRangePicker } from "../SellerReportsDateRangePicker";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, HelpCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SellerSalesBrandBasedTab() {
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

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Marka Bazlı Satış Raporları
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Excel İle İndir
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marka</TableHead>
              <TableHead className="text-right">Brüt Satış Adedi</TableHead>
              <TableHead className="text-right">İptal Adedi</TableHead>
              <TableHead className="text-right">İptal Oranı</TableHead>
              <TableHead className="text-right">İade Adedi</TableHead>
              <TableHead className="text-right">İade Oranı</TableHead>
              <TableHead className="text-right">Net Satış Adedi</TableHead>
              <TableHead className="text-right">Brüt Ciro</TableHead>
              <TableHead className="text-right">İndirim Tutarı</TableHead>
              <TableHead className="text-right">Net Ciro</TableHead>
              <TableHead className="text-right">Toplam Komisyon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Arzuamber moda</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">%0</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">%0</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">3.300 ₺</TableCell>
              <TableCell className="text-right">1.188 ₺</TableCell>
              <TableCell className="text-right">2.112 ₺</TableCell>
              <TableCell className="text-right">352.7 ₺</TableCell>
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
