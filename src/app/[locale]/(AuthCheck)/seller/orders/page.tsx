"use client";

import { Button } from "@/components/ui/button";
import { orders } from "@/data/sellerOrdersData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import SellerOrdersTable from "@/components/seller-components/orders/SellerOrdersTable";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import {
  AlertTriangle,
  Ban,
  CalendarIcon,
  Clock,
  Hammer,
  ListOrdered,
  ShieldX,
  Truck,
  UserX,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { tr, enUS } from "date-fns/locale";

type TabStatus = "all" | "new" | "processing" | "delivered" | "canceled";
type CancelType =
  | "all-cancellations"
  | "customer-cancellations"
  | "my-cancellations"
  | "tekera21-cancellations";

interface TabItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function SellerOrderManagement() {
  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [cancelType, setCancelType] = useState<CancelType>("all-cancellations");
  const cancelTypeMap: Record<
    Exclude<CancelType, "all-cancellations">,
    string
  > = {
    "customer-cancellations": "customer",
    "my-cancellations": "seller",
    "tekera21-cancellations": "tekera21",
  };
  const tabItems: TabItem[] = [
    {
      label: "Tüm Siparişler",
      value: "all",
      icon: <ListOrdered className="w-4 h-4" />,
    },
    {
      label: "Yeni Siparişleriniz",
      value: "new",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "İşleme Alınanlar",
      value: "processing",
      icon: <Hammer className="w-4 h-4" />,
    },
    {
      label: "Teslim Edilenler",
      value: "delivered",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      label: "İptal Edilenler",
      value: "canceled",
      icon: <Ban className="w-4 h-4" />,
    },
  ];

  const cancelTabItems: {
    label: string;
    value: CancelType;
    icon: React.ReactNode;
  }[] = [
    {
      label: "Tüm İptaller",
      value: "all-cancellations",
      icon: <Ban className="w-4 h-4" />,
    },
    {
      label: "Müşterinin İptal Ettiği",
      value: "customer-cancellations",
      icon: <UserX className="w-4 h-4" />,
    },
    {
      label: "Benim İptal Ettiğim",
      value: "my-cancellations",
      icon: <ShieldX className="w-4 h-4" />,
    },
    {
      label: "tekera21'un İptal Ettiği",
      value: "tekera21-cancellations",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  ];

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    customerName: "",
    orderNo: "",
    packageNo: "",
    barcode: "",
    cargoCode: "",
    productName: "",
  });

  // Filter orders based on active tab and filters
  useEffect(() => {
    let result = [...orders];

    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "canceled") {
        result = result.filter((order: any) => order.status === "canceled");

        if (cancelType !== "all-cancellations") {
          result = result.filter(
            (order: any) =>
              order.cancelType ===
              cancelTypeMap[
                cancelType as Exclude<CancelType, "all-cancellations">
              ]
          );
        }
      } else {
        const statusMap = {
          new: "new",
          processing: "processing",
          delivered: "delivered",
        };
        result = result.filter(
          (order: any) => order.status === statusMap[activeTab]
        );
      }
    }

    // Apply text filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((order) => {
          if (key === "customerName")
            return order.recipient.toLowerCase().includes(value.toLowerCase());
          if (key === "orderNo") return order.id.includes(value);
          if (key === "packageNo") return order.packageNo.includes(value);
          if (key === "productName")
            return order.productName
              .toLowerCase()
              .includes(value.toLowerCase());
          if (key === "barcode" || key === "cargoCode")
            return order[key]?.includes(value);
          return true;
        });
      }
    });

    // Apply date filters
    if (startDate) {
      result = result.filter((order) => new Date(order.orderDate) >= startDate);
    }
    if (endDate) {
      result = result.filter((order) => new Date(order.orderDate) <= endDate);
    }

    setFilteredOrders(result);
  }, [activeTab, cancelType, filters, startDate, endDate]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      customerName: "",
      orderNo: "",
      packageNo: "",
      barcode: "",
      cargoCode: "",
      productName: "",
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const getOrderCount = (status: any) => {
    if (status === "all") return orders.length;
    if (status === "canceled")
      return orders.filter((o: any) => o.status === "canceled").length;
    if (status === "new")
      return orders.filter((o: any) => o.status === "new").length;
    if (status === "processing")
      return orders.filter((o: any) => o.status === "processing").length;
    if (status === "delivered")
      return orders.filter((o: any) => o.status === "delivered").length;
    return 0;
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabStatus)}
        className="w-full"
      >
        <TabsList className="w-full border-b grid grid-cols-2 md:grid-cols-5 gap-2 px-2 py-2 md:p-0 ">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative  py-3 px-4 flex flex-col items-center justify-center text-sm font-medium text-gray-700 hover:text-black transition border md:border-none cursor-pointer"
            >
              <div className="flex items-center gap-1">
                {tab.icon}
                <span>{tab.label}</span>
                <span className="mt-1 bg-gray-100 text-xs px-2 py-0.5 rounded-full">
                  {getOrderCount(tab.value)}
                </span>
              </div>

              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeTab === "canceled" && (
          <div className="mt-2 border-b">
            <Tabs
              value={cancelType}
              onValueChange={(value) => setCancelType(value as CancelType)}
            >
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 border-b bg-transparent">
                {cancelTabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`relative py-2 px-4 flex flex-col items-center text-sm font-medium transition ${
                      cancelType === tab.value
                        ? "text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {tab.icon}
                      <span className="text-xs sm:text-sm">{tab.label}</span>
                    </div>
                    {cancelType === tab.value && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        <SellerInnerContainer>
          <div className="mt-4 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-4">
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
              name="packageNo"
              placeholder="Paket No"
              value={filters.packageNo}
              onChange={handleFilterChange}
            />
            <Input
              name="barcode"
              placeholder="Barkod"
              value={filters.barcode}
              onChange={handleFilterChange}
            />
            <Input
              name="cargoCode"
              placeholder="Kargo Kodu"
              value={filters.cargoCode}
              onChange={handleFilterChange}
            />
            <Input
              name="productName"
              placeholder="Ürün Adı / Model Kodu"
              value={filters.productName}
              onChange={handleFilterChange}
            />
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
                    : "Sipariş Başlangıç Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate
                    ? format(endDate, "dd MMM yyyy", { locale: dateFnsLocale })
                    : "Sipariş Bitiş Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-4 flex justify-end gap-2 ">
            <Button variant="outline" onClick={clearFilters}>
              Temizle
            </Button>
            <Button>Filtrele</Button>
          </div>

          <TabsContent value="all" className="mt-6">
            <SellerOrdersTable orders={filteredOrders} />
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <SellerOrdersTable orders={filteredOrders} />
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <SellerOrdersTable orders={filteredOrders} />
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <SellerOrdersTable orders={filteredOrders} />
          </TabsContent>

          <TabsContent value="canceled" className="mt-6">
            <SellerOrdersTable orders={filteredOrders} />
          </TabsContent>
        </SellerInnerContainer>
      </Tabs>
    </>
  );
}
