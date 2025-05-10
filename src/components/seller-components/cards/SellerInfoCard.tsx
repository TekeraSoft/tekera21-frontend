import { Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SellerInfoCard({ SellerCompanyInfo }: any) {
  if (!SellerCompanyInfo) {
    // Veriler yükleniyorsa Skeleton göster
    return (
      <Card className="w-full shadow-sm border border-gray-200 rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Seller Info Skeleton */}
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-md" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>

            {/* Status, Delivery Time, Commercial Level Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 text-right text-sm w-full  max-w-2xl">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Veriler geldiyse gerçek içerik
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Normal":
        return { color: "bg-green-500", variant: "success" as const };
      case "Yoğun":
        return { color: "bg-yellow-500", variant: "warning" as const };
      case "Çok Yoğun":
        return { color: "bg-orange-500", variant: "danger" as const };
      case "Kapalı":
        return { color: "bg-red-500", variant: "destructive" as const };
      default:
        return { color: "bg-gray-500", variant: "secondary" as const };
    }
  };

  const statusInfo = getStatusInfo(SellerCompanyInfo.operationStatus);

  return (
    <Card className="w-full shadow-sm border border-gray-200 rounded-xl">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 rounded-md border border-gray-200 shrink-0">
              <AvatarImage
                src={SellerCompanyInfo.logo || "/placeholder.svg"}
                alt={SellerCompanyInfo.name}
              />
              <AvatarFallback className="bg-gray-100 text-gray-700">
                {SellerCompanyInfo.name}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {SellerCompanyInfo.name}
                </h3>
                <span className="text-sm text-gray-500">
                  (ID: {SellerCompanyInfo.id})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 text-sm",
                    "bg-green-100 text-green-800 hover:bg-green-200"
                  )}
                >
                  <span>
                    Satıcı Puanı: {SellerCompanyInfo?.score?.toFixed(2)}/10
                  </span>
                  <Star className="h-4 w-4 fill-current" />
                </Badge>

                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 text-sm",
                    "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  )}
                >
                  <span>Takipçi: {SellerCompanyInfo.follower}</span>
                  <Users className="h-4 w-4" />
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 text-right text-sm w-full  max-w-2xl">
            <div className="flex-1 md:border-r md:pr-4">
              <p className="text-gray-500 text-xs">Siparişler</p>
              <p className="font-medium text-gray-800">
                {SellerCompanyInfo.totalOrders} Toplam Sipariş
              </p>
              <p className="font-medium text-gray-800">
                {SellerCompanyInfo.todaysOrders} Bugün Sipariş
              </p>
            </div>

            <div className="flex-1 md:border-r md:pr-4">
              <p className="text-gray-500 text-xs">Ürünler</p>
              <p className="font-medium text-gray-800">
                {SellerCompanyInfo.totalProducts} Toplam Ürün
              </p>
              <p className="font-medium text-gray-800">
                {SellerCompanyInfo.approvedProducts} Onaylanan Ürün
              </p>
            </div>

            <div className="flex-1 md:border-r md:pr-4">
              <p className="text-gray-500 text-xs">Operasyon Durumu</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <div
                  className={`h-3.5 w-3.5 rounded-full ${statusInfo.color}`}
                ></div>
                <Badge
                  variant={statusInfo.variant}
                  className="font-medium text-xs"
                >
                  {SellerCompanyInfo.operationStatus}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {SellerCompanyInfo.pendingOrders} sipariş bekliyor
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs text-gray-500">İhlal Puanı</p>
              <p className="font-medium text-green-600">
                {SellerCompanyInfo.cancelledOrders} İptal Sipariş
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
