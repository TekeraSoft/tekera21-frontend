"use client";

import SellerOrderReturnTable from "@/components/seller-components/orders/SellerReturnTable";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, PackageOpen } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { tr, enUS } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

// Define TypeScript interfaces
interface ReturnItem {
  id: string;
  orderDate: string;
  returnDate?: string;
  packageNo: string;
  recipient: string;
  quantity: number;
  productName: string;
  productCode: string;
  price: string;
  status: string;
  barcode: string;
  returnReason?: string;
  size?: string;
  color?: string;
  stockCode?: string;
}

interface TabInfo {
  id: string;
  label: string;
  count: number;
}

export default function SellerReturnManagement() {
  // Define tabs
  const tabs: TabInfo[] = [
    { id: "all", label: "Tüm İadeler", count: 8 },
    { id: "requested", label: "Talep Oluşturulan", count: 1 },
    { id: "shipped", label: "Kargoya Verilen", count: 0 },
    { id: "waiting", label: "Aksiyon Bekleyen", count: 2 },
    { id: "approved", label: "Onaylanan", count: 5 },
    { id: "rejected", label: "Reddedilen", count: 0 },
    { id: "analysis", label: "Analiz", count: 0 },
    { id: "disputed", label: "İtirazlı", count: 0 },
    { id: "suspended", label: "Askıda İadeler", count: 0 },
  ];

  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;
  const [activeTab, setActiveTab] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [filteredReturns, setFilteredReturns] = useState<ReturnItem[]>([]);
  const [filters, setFilters] = useState({
    customerName: "",
    orderNo: "",
    returnCode: "",
    barcode: "",
    returnReason: "",
  });

  // Sample data
  const returnItems: ReturnItem[] = [
    {
      id: "1014649940",
      orderDate: "19.04.2023 15:33",
      returnDate: "19.04.2023 15:58",
      packageNo: "SXPL28644",
      recipient: "Turcan Mutlu",
      quantity: 1,
      productName:
        "V Yaka Pamuklu Viskon T-shirt V Yaka Pamuklu Viskon T-shirt, XL",
      productCode: "SXPL28644",
      price: "₺350,00",
      status: "approved",
      barcode: "SXPL28644",
      returnReason: "Beden/Ebat: Küçük Geldi",
      size: "XL",
      color: "Beyaz",
      stockCode: "SXPL28644",
    },
    {
      id: "1014584192",
      orderDate: "18.04.2023 10:52",
      returnDate: "22.04.2023 10:28",
      packageNo: "2TBEGF2",
      recipient: "dilek yakutlu",
      quantity: 1,
      productName:
        "V Yaka Pamuklu Viskon T-shirt V Yaka Pamuklu Viskon T-shirt, M",
      productCode: "2TBEGF2",
      price: "₺350,00",
      status: "approved",
      barcode: "2TBEGF2",
      returnReason: "Beden/Ebat: Büyük Geldi",
      size: "M",
      color: "Kahverengi",
      stockCode: "2TBEGF2",
    },
    {
      id: "1014965325",
      orderDate: "19.04.2023 21:42",
      returnDate: "22.04.2023 14:15",
      packageNo: "5568N35",
      recipient: "Gülizar İncel",
      quantity: 1,
      productName:
        "Yüksek Bel Paça Düşüklü Serpmeli Taşlı Gri Kot Pantolon TYC308CD5KXIF2 E9299X300_40",
      productCode: "5568N35",
      price: "₺1.400,00",
      status: "approved",
      barcode: "5568N354",
      returnReason: "Beden/Ebat: Büyük Geldi",
      size: "40",
      color: "Gri",
      stockCode: "5568N35",
    },
    {
      id: "1019295601",
      orderDate: "08.05.2023 13:49",
      returnDate: "11.05.2023 16:47",
      packageNo: "PAZDHSML",
      recipient: "Meryem Doğru",
      quantity: 1,
      productName: "Tüy Ve Taş Detaylı Abiye TYC0724F507A70624985784, 40",
      productCode: "PAZDHSML",
      price: "₺3.300,00",
      status: "requested",
      barcode: "PAZDHSML",
      returnReason: "Beden/Ebat: Küçük Geldi",
      size: "40",
      color: "Mavi",
      stockCode: "PAZDHSML",
    },
  ];

  // Filter returns based on active tab and filters
  useEffect(() => {
    let result = [...returnItems];

    // Filter by tab
    if (activeTab !== "all") {
      const statusMap: Record<string, string> = {
        requested: "requested",
        shipped: "shipped",
        waiting: "waiting",
        approved: "approved",
        rejected: "rejected",
      };

      if (statusMap[activeTab]) {
        result = result.filter((item) => item.status === statusMap[activeTab]);
      }
    }

    // Apply text filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) => {
          if (key === "customerName")
            return item.recipient.toLowerCase().includes(value.toLowerCase());
          if (key === "orderNo") return item.id.includes(value);
          if (key === "returnCode") return item.packageNo.includes(value);
          if (key === "barcode") return item.barcode.includes(value);
          if (key === "returnReason")
            return item.returnReason
              ?.toLowerCase()
              .includes(value.toLowerCase());
          return true;
        });
      }
    });

    // Apply date filters
    if (startDate) {
      result = result.filter((item) => {
        const itemDate = new Date(
          item.returnDate?.split(".").reverse().join("-") || ""
        );
        return itemDate >= startDate;
      });
    }
    if (endDate) {
      result = result.filter((item) => {
        const itemDate = new Date(
          item.returnDate?.split(".").reverse().join("-") || ""
        );
        return itemDate <= endDate;
      });
    }

    setFilteredReturns(result);
  }, [activeTab, filters, startDate, endDate]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      customerName: "",
      orderNo: "",
      returnCode: "",
      barcode: "",
      returnReason: "",
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full border-b flex justify-start overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative py-2 px-4"
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            name="customerName"
            placeholder="Müşteri Adı"
            value={filters.customerName}
            onChange={handleFilterChange}
          />
          <Input
            name="orderNo"
            placeholder="Sipariş No"
            value={filters.orderNo}
            onChange={handleFilterChange}
          />
          <Input
            name="returnCode"
            placeholder="İade Kodu"
            value={filters.returnCode}
            onChange={handleFilterChange}
          />
          <Input
            name="barcode"
            placeholder="Barkod"
            value={filters.barcode}
            onChange={handleFilterChange}
          />
          <Select
            value={filters.returnReason}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, returnReason: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="İade Sebebi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Sebepler</SelectItem>
              <SelectItem value="küçük">Beden/Ebat: Küçük Geldi</SelectItem>
              <SelectItem value="büyük">Beden/Ebat: Büyük Geldi</SelectItem>
              <SelectItem value="hasarlı">Ürün Hasarlı/Defolu</SelectItem>
              <SelectItem value="yanlış">Yanlış Ürün Gönderildi</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate
                    ? format(startDate, "dd MMM yyyy", {
                        locale: dateFnsLocale,
                      })
                    : "İade Talep Başlangıç Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate
                    ? format(endDate, "dd MMM yyyy", { locale: tr })
                    : "İade Talep Bitiş Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Temizle
          </Button>
          <Button>Filtrele</Button>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{tab.label}</h2>
              <div className="text-sm text-gray-500">
                Filtreleme Sonuçları: Toplam {filteredReturns.length} iade
                bilgisi
                <div className="text-xs">
                  Son Güncellenme: 13 Mayıs 2023 12:04
                </div>
              </div>
            </div>

            {filteredReturns.length > 0 ? (
              <SellerOrderReturnTable returns={filteredReturns} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                  <PackageOpen />
                </div>
                <h3 className="text-lg font-medium">
                  Siparişin Bulunmamaktadır.
                </h3>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
