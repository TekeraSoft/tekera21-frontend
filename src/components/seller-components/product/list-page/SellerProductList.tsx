"use client";

import { useState } from "react";
import { Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

import SellerProductListTabsHeader from "./SellerProductListTabsHeader";
import SellerInnerContainer from "../../containers/SellerInnerContainer";

// Sample product data
const products = [
  {
    id: 1,
    name: "Varak Baskılı Siyah Midi Elbise",
    sku: "TYO92E7C97DB0BF8EBEA3A009",
    variant: "3 Varyant",
    variantStatus: "Orta",
    stockRatio: "---",
    trendPrice: "1.200,00 ₺",
    stock: 5,

    expiryDate: "-",
    category: "Elbise",
    color: "Siyah Siyah",
    status: "active",
  },
  {
    id: 2,
    name: "Varak Baskılı Beyaz Midi Elbise",
    sku: "TYO92E7C97DB0BF8EBEA3A009",
    variant: "3 Varyant",
    variantStatus: "Orta",
    stockRatio: "---",
    trendPrice: "1.200,00 ₺",
    stock: 5,

    expiryDate: "-",
    category: "Elbise",
    color: "Beyaz Beyaz",
    status: "active",
  },
  {
    id: 3,
    name: "Yüksek Bel Elastolu Bej Pantolon",
    sku: "TYCC62DA16214B6EAB6506200T11",
    variant: "M Beden",
    variantStatus: "Zayıf",
    stockRatio: "%16.70",
    stockCode: "3WNQJA7V",
    trendPrice: "749 ₺",
    stock: 1,

    expiryDate: "2",
    category: "Pantolon",
    color: "Bej Bej",
    status: "pending",
  },
  {
    id: 4,
    name: "Pul İşlemeli Tüllü Kol Detaylı Abiye",
    sku: "TYCD726F5D7A7062491B571827",
    variant: "38 Beden",
    variantStatus: "Orta",
    stockRatio: "%16.70",
    stockCode: "I4YXUTB6",
    trendPrice: "3.737,52 ₺",
    stock: 1,
    expiryDate: "2",
    category: "Abiye & Mezuniyet Elbisesi",
    color: "Pembe Pembe",
    status: "passive",
  },
  {
    id: 5,
    name: "Keten Karışımlı Gömlek",
    sku: "TYCD726F5D7A7062491B571828",
    variant: "L Beden",
    variantStatus: "Güçlü",
    stockRatio: "%25.30",
    stockCode: "K7LPUTB2",
    trendPrice: "450,00 ₺",
    stock: 8,
    expiryDate: "5",
    category: "Gömlek",
    color: "Mavi Mavi",
    status: "all",
  },
];

// Filter component for each tab
function FilterSection({ activeTab, onApplyFilter }: any) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Input placeholder="Barkod" className="w-full" />
          <Input placeholder="Ürün Adı" className="w-full" />
          <Input placeholder="Model Kodu" className="w-full" />
          <Input placeholder="Stok Kodu" className="w-full" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Hediye Paketi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Evet</SelectItem>
              <SelectItem value="no">Hayır</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elbise">Elbise</SelectItem>
              <SelectItem value="pantolon">Pantolon</SelectItem>
              <SelectItem value="gomlek">Gömlek</SelectItem>
              <SelectItem value="abiye">Abiye</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Marka" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand1">Marka 1</SelectItem>
              <SelectItem value="brand2">Marka 2</SelectItem>
              <SelectItem value="brand3">Marka 3</SelectItem>
            </SelectContent>
          </Select>

          <Collapsible
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            className="w-full md:w-auto"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Detaylı Filtreyi {isFilterOpen ? "Kapat" : "Aç"}
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stok Durumu</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="stock-all" />
                    <label htmlFor="stock-all" className="text-sm">
                      Tümü
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="stock-available" />
                    <label htmlFor="stock-available" className="text-sm">
                      Stokta Var
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="stock-unavailable" />
                    <label htmlFor="stock-unavailable" className="text-sm">
                      Stokta Yok
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fiyat Aralığı</label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" className="w-full" />
                    <Input placeholder="Max" type="number" className="w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Varyant Durumu</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="variant-all" />
                    <label htmlFor="variant-all" className="text-sm">
                      Tümü
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="variant-strong" />
                    <label htmlFor="variant-strong" className="text-sm">
                      Güçlü
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="variant-medium" />
                    <label htmlFor="variant-medium" className="text-sm">
                      Orta
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="variant-weak" />
                    <label htmlFor="variant-weak" className="text-sm">
                      Zayıf
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button variant="outline" className="w-full md:w-auto">
            Temizle
          </Button>
          <Button
            className="w-full md:w-auto"
            onClick={() => onApplyFilter(activeTab)}
          >
            Filtrele
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {activeTab === "all" && (
            <>
              <div className="flex items-center gap-2">
                <Checkbox id="all-products" defaultChecked />
                <label htmlFor="all-products" className="text-sm">
                  Tümü (80)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="buybox-in" />
                <label htmlFor="buybox-in" className="text-sm">
                  Buybox Dahil Olanlar (0)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="buybox-out" />
                <label htmlFor="buybox-out" className="text-sm">
                  Buybox Dahil Olmayanlar (80)
                </label>
              </div>
            </>
          )}
          {activeTab === "active" && (
            <>
              <div className="flex items-center gap-2">
                <Checkbox id="active-all" defaultChecked />
                <label htmlFor="active-all" className="text-sm">
                  Tümü (80)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="active-buybox-in" />
                <label htmlFor="active-buybox-in" className="text-sm">
                  Buybox Dahil Olanlar (0)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="active-buybox-out" />
                <label htmlFor="active-buybox-out" className="text-sm">
                  Buybox Dahil Olmayanlar (80)
                </label>
              </div>
            </>
          )}
          {activeTab === "pending" && (
            <>
              <div className="flex items-center gap-2">
                <Checkbox id="pending-all" defaultChecked />
                <label htmlFor="pending-all" className="text-sm">
                  Tümü (2)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pending-new" />
                <label htmlFor="pending-new" className="text-sm">
                  Yeni Ürünler (1)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pending-update" />
                <label htmlFor="pending-update" className="text-sm">
                  Güncellenen Ürünler (1)
                </label>
              </div>
            </>
          )}
          {activeTab === "passive" && (
            <>
              <div className="flex items-center gap-2">
                <Checkbox id="passive-all" defaultChecked />
                <label htmlFor="passive-all" className="text-sm">
                  Tümü (1)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="passive-stock" />
                <label htmlFor="passive-stock" className="text-sm">
                  Stok Yetersiz (0)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="passive-rejected" />
                <label htmlFor="passive-rejected" className="text-sm">
                  Reddedilen (1)
                </label>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Product table component
function ProductTable({ products, activeTab }: any) {
  // Filter products based on active tab
  const filteredProducts = products.filter((product: any) => {
    if (activeTab === "all") return true;
    return product.status === activeTab;
  });

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <Checkbox id="select-all" />
          <label htmlFor="select-all" className="text-sm font-medium">
            Toplu İşlemler (0)
          </label>
        </div>
        <Button variant="outline" size="sm">
          Tabloyu Özelleştir
        </Button>
      </div>

      <div className="flex justify-between items-center p-4 border-b">
        <div className="text-sm text-muted-foreground">
          Her Sayfada
          <Select defaultValue="20">
            <SelectTrigger className="w-[70px] h-8 ml-2">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sayfaya Git</span>
          <Input className="w-[60px] h-8" defaultValue="1" />
          <div className="flex">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
            >
              <ChevronDown className="h-4 w-4 rotate-270" />
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Ürün Bilgisi</TableHead>
            <TableHead>
              <div>Varyant</div>
            </TableHead>
            <TableHead>
              <div>Doluluk Oranı</div>
            </TableHead>
            <TableHead>
              <div>Stok Kodu</div>
            </TableHead>
            <TableHead>
              <div>Komisyon</div>
            </TableHead>
            <TableHead>
              <div>tekera21 Satış Fiyatı</div>
            </TableHead>
            <TableHead>
              <div>Stok</div>
            </TableHead>

            <TableHead>Termin Süresi</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center py-8">
                Bu filtrelere uygun ürün bulunamadı.
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox id={`select-${product.id}`} />
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                      <div className="w-12 h-16 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Model Kodu: {product.sku}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Renk: {product.color}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.variant}
                    <Badge
                      variant={
                        product.variantStatus === "Güçlü"
                          ? "success"
                          : product.variantStatus === "Orta"
                          ? "warning"
                          : "destructive"
                      }
                      className="ml-2"
                    >
                      {product.variantStatus}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{product.stockCode || "---"}</TableCell>
                <TableCell> {product.stockRatio}</TableCell>
                <TableCell>{product.trendPrice}</TableCell>
                <TableCell>{product.stock}</TableCell>

                <TableCell>{product.expiryDate}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Varyant Ekle
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Detaya Git
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">İşlemler</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuItem>Düzenle</DropdownMenuItem>
                        <DropdownMenuItem>Kopyala</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function SellerProductList() {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleApplyFilter = (tab: any) => {
    // In a real application, you would apply filters based on form values
    // For this example, we're just filtering by tab
    if (tab === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.status === tab));
    }
  };

  return (
    <SellerInnerContainer>
      <SellerProductListTabsHeader />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-4">
          <FilterSection
            activeTab={activeTab}
            onApplyFilter={handleApplyFilter}
          />
        </div>

        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4  items-center gap-5 min-h-24 px-2">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-12"
          >
            Tüm Ürünler
            <Badge variant="outline" className="ml-2">
              80
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Aktif Ürünler
            <Badge variant="outline" className="ml-2">
              80
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Onay Bekleyen Ürünler
            <Badge variant="outline" className="ml-2">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="passive"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Pasif Ürünler
            <Badge variant="outline" className="ml-2">
              1
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ProductTable products={filteredProducts} activeTab="all" />
        </TabsContent>

        <TabsContent value="active">
          <ProductTable products={filteredProducts} activeTab="active" />
        </TabsContent>

        <TabsContent value="pending">
          <ProductTable products={filteredProducts} activeTab="pending" />
        </TabsContent>

        <TabsContent value="passive">
          <ProductTable products={filteredProducts} activeTab="passive" />
        </TabsContent>
      </Tabs>
    </SellerInnerContainer>
  );
}
