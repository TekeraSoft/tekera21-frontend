import { Package, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISellerDashboardData } from "@/types/SellerTypes/SellerReportTypes";
import { formatPrice } from "@/lib/formatters";

const RevenueCard = ({
  profit,
  period,
}: {
  profit: number;
  period: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {period} Toplam Gelir
        </CardTitle>
        <p className="text-xl font-medium">₺</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatPrice(profit)}</div>
        {/* <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +20.1% <ArrowUpRight className="ml-1 h-3 w-3" />
            </span>
            from last month
          </p> */}
      </CardContent>
    </Card>
  );
};

export function DashboardCards({ data }: { data: ISellerDashboardData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-4">
      <RevenueCard
        profit={data.sellerReportAggregation.dailyProfit}
        period="Günlük"
      />
      <RevenueCard
        profit={data.sellerReportAggregation.weeklyProfit}
        period="Haftalık"
      />
      <RevenueCard
        profit={data.sellerReportAggregation.monthlyProfit}
        period="Aylık"
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalOrders}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalProducts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Takipçiler</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.followers.length}</div>
        </CardContent>
      </Card>
    </div>
  );
}
