"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Package, X } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ICampaign, TCampaignType } from "@/types/AdminTypes/campaign";

interface CampaignListProps {
  campaigns: ICampaign[];
  onAddProducts: (campaign: ICampaign) => void;
  onRemoveProducts: (campaign: ICampaign) => void;
}

const campaignTypeLabels = {
  FREESHIPPING: "Ücretsiz Kargo",
  BUYXGETY: "X Al Y Öde",
  DISCOUNT: "İndirim",
  PERCENTAGE: "Yüzde İndirim",
  SEASONAL: "Mevsimsel",
  COUPON: "Kupon",
};
const campaignTypeColors: Record<TCampaignType, string> = {
  FREESHIPPING:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  BUYXGETY: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  DISCOUNT:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  SEASONAL:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  COUPON:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

export function CampaignList({
  campaigns,
  onAddProducts,
  onRemoveProducts,
}: CampaignListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge className={campaignTypeColors[campaign.campaignType]}>
                  {campaignTypeLabels[campaign.campaignType]}
                </Badge>
              </div>
            </div>
            <CardDescription className="text-sm">
              {campaign.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(campaign.startDate), "dd MMM yyyy", {
                  locale: tr,
                })}{" "}
                -{" "}
                {format(new Date(campaign.endDate), "dd MMM yyyy", {
                  locale: tr,
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />

              {campaign.totalProductValue > 0 && (
                <span className="text-primary font-medium mb-0.5">
                  Toplam {campaign.totalProductValue} ürün
                </span>
              )}
            </div>

            {/* {campaign.products && campaign.products.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Kampanyadaki Ürünler:</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {campaign.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 bg-muted rounded-md text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-muted-foreground">
                          ₺{product.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveProduct(campaign.id, product.id)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            <div className="flex gap-2">
              <Button
                onClick={() => onAddProducts(campaign)}
                className="w-full"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ürün Ekle
              </Button>
              <Button
                onClick={() => onRemoveProducts(campaign)}
                className="w-full"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ürün Çıkar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
