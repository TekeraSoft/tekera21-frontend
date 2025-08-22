import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IRecentOrders } from "@/types/SellerTypes/SellerReportTypes";
import { formatDate, formatPrice } from "@/lib/formatters";
import { makeCdnUrl } from "@/lib/makeCdnUrl";

export function RecentOrders({ orders }: { orders: IRecentOrders }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Siparişler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.content.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={
                      makeCdnUrl(order.productImage[0]) || "/placeholder.svg"
                    }
                    alt={order.buyerFirstName}
                  />
                  <AvatarFallback>
                    {order.buyerFirstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {order.buyerFirstName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.buyerLastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={getStatusColor(order.createdAt)}
                  variant="outline"
                >
                  {formatDate(order.createdAt)}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
