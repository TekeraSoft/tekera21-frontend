import { SellerReportsDateRangePicker } from "@/components/seller-components/seller-reports/SellerReportsDateRangePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Download, Info } from "lucide-react";

export default function OperasyonPage() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <SellerReportsDateRangePicker
          defaultValue={{
            from: new Date(2025, 4, 8),
            to: new Date(2025, 4, 8),
          }}
        />

        <div className="ml-auto flex gap-2">
          <Button variant="outline">Temizle</Button>
          <Button>Filtrele</Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Operasyon Performans Metrikleri
          </h2>
          <div className="text-sm text-muted-foreground">
            <Button variant="outline" size="sm" className="gap-2 ml-2">
              <Download className="h-4 w-4" />
              Excel İle İndir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Tedarik Edilememe Oranı
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Checkbox checked={true} />
              </div>
              <div className="text-2xl font-bold mt-2">%0</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Tedarik Edilemeyen Ürün Adedi
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Checkbox checked={true} />
              </div>
              <div className="text-2xl font-bold mt-2">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Kusurlu & Yanlış & Eksik İade Oranı
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Checkbox checked={false} />
              </div>
              <div className="text-2xl font-bold mt-2">%0</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">
                    Kusurlu & Yanlış & Eksik İade Adedi
                  </div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Checkbox checked={false} />
              </div>
              <div className="text-2xl font-bold mt-2">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium">İade Oranı</div>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <Checkbox checked={true} />
              </div>
              <div className="text-2xl font-bold mt-2">%21.74</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Tedarik Edilememe Oranı</span>
          <div className="w-3 h-3 rounded-full bg-orange-500 ml-4"></div>
          <span className="text-sm">Tedarik Edilemeyen Ürün Adedi</span>
          <div className="ml-auto text-sm text-muted-foreground">
            Sayfa 2 / 9
            <Button variant="link" size="sm" className="ml-2">
              Temizle
            </Button>
          </div>
        </div>

        <div className="h-[200px] w-full bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
          <span className="text-muted-foreground">Grafik Gösterimi</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kalite Metriklerin</TableHead>
              <TableHead>Aralık 2024</TableHead>
              <TableHead>Ocak 2025</TableHead>
              <TableHead>Şubat 2025</TableHead>
              <TableHead>Mart 2025</TableHead>
              <TableHead>Nisan 2025</TableHead>
              <TableHead>Mayıs 2025</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-muted/30">
              <TableCell className="font-medium">Satış Metrikleri</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center">
                  Satılan Ürün Adedi
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>19</TableCell>
              <TableCell>4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center">
                  Tedarik Edilememe Oranı
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell>%0</TableCell>
              <TableCell>%0</TableCell>
              <TableCell>%0</TableCell>
              <TableCell>%0</TableCell>
              <TableCell>%0</TableCell>
              <TableCell>%0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center">
                  Tedarik Edilemeyen Ürün Adedi
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
