import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Radix Tooltip UI komponentin doğru import'u
import { HelpCircle } from "lucide-react";
import React from "react";

interface ActionItem {
  label: string;
  value: number | string;
  link: string;
  badge?: string;
  helpIcon?: boolean;
  helpText?: string;
}

interface Section {
  title: string;
  items: ActionItem[];
}

const SellerActionsCard = () => {
  const sections: Section[] = [
    {
      title: "Sipariş & Operasyon",
      items: [
        {
          label: "Bekleyen Siparişler",
          value: 0,
          link: "/orders/pending",
          helpIcon: true,
          helpText:
            "Bu bölümde bekleyen siparişlerinizin durumunu görebilirsiniz.",
        },
        {
          label: "Geciken Siparişler",
          value: 0,
          link: "/orders/delayed",
          helpIcon: true,
          helpText:
            "Bu bölümde geciken siparişlerinizin durumunu görebilirsiniz.",
        },
        {
          label: "Bekleyen İadeler",
          value: 0,
          link: "/orders/returns",
          helpIcon: true,
          helpText: "Bu bölümde bekleyen iade taleplerinizi görebilirsiniz.",
        },
        {
          label: "Sipariş Soruları",
          value: 0,
          link: "/orders/questions",
          helpIcon: true,
          helpText:
            "Bu bölümde siparişlerinizle ilgili soruları takip edebilirsiniz.",
        },
      ],
    },
    {
      title: "Ürün",
      items: [
        {
          label: "Ürün Soruları",
          value: 0,
          link: "/products/questions",
          helpIcon: true,
          helpText:
            "Bu bölümde ürünlerinizle ilgili soruları takip edebilirsiniz.",
        },
        {
          label: "Zayıf İçerikli Ürünler",
          value: 16,
          link: "/products/weak-content",
          helpIcon: true,
          helpText:
            "Bu bölümde zayıf içerikli ürünlerinizin listesini görebilirsiniz.",
        },
        {
          label: "Revize Bekleyen Ürünler",
          value: 2,
          link: "/products/awaiting-review",
          helpIcon: true,
          helpText:
            "Bu bölümde revize edilmesi gereken ürünlerinizi görebilirsiniz.",
        },
        {
          label: "Tükenenler",
          value: 11,
          link: "/products/out-of-stock",
          helpIcon: true,
          helpText:
            "Bu bölümde tükenen ürünlerinizin listesini görüntüleyebilirsiniz.",
        },
      ],
    },
    {
      title: "Satış Artırıcı",
      items: [
        {
          label: "Reklam Bakiyesi",
          value: "1.491 ₺",
          link: "/ads/balance",
          badge: "Yeni",
          helpIcon: true,
          helpText:
            "Bu bölümde reklam bakiyenizi ve harcama durumunuzu kontrol edebilirsiniz.",
        },
        {
          label: "Kampanyalar",
          value: "1/9",
          link: "/ads/campaigns",
          badge: "Yeni",
          helpIcon: true,
          helpText: "Bu bölümde mevcut kampanyalarınızı takip edebilirsiniz.",
        },
        {
          label: "Avantajlı Ürün Etiketleri",
          value: "5/68",
          link: "/ads/advantage-tags",
          badge: "Yeni",
          helpIcon: true,
          helpText:
            "Bu bölümde avantajlı etiketli ürünlerinizi görüntüleyebilirsiniz.",
        },
        {
          label: "Flaş Ürünler",
          value: "0/15",
          link: "/ads/flash-products",
          helpIcon: true,
          helpText:
            "Bu bölümde flaş ürünlerinizi düzenleyebilir ve takip edebilirsiniz.",
        },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksiyonlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="text-sm font-medium text-blue-600">
                {section.title}
              </div>
              {section.items.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className="flex items-center justify-between py-3 border-b hover:bg-blue-50 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    {item.label}
                    {item.helpIcon && item.helpText && (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {item.helpText}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.value}</span>
                    {item.badge && (
                      <Badge variant="danger" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerActionsCard;
