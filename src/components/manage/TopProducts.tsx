import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITopProducts } from "@/types/SellerTypes/SellerReportTypes";
import { formatPrice } from "@/lib/formatters";

export function TopProducts({ products }: { products: ITopProducts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>En Çok Satılanlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.content.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-secondary font-medium">Kategori: </span>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  {product.subCategories.map((sub) => {
                    return (
                      <Badge key={sub.id} variant="outline" className="text-xs">
                        {sub.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                {product.discountPrice > 0 && (
                  <p className="text-xs font-medium line-through text-red-500">
                    {formatPrice(product.price)}
                  </p>
                )}
                <p className="text-sm font-medium">
                  {formatPrice(
                    product.discountPrice > 0
                      ? product.discountPrice
                      : product.price
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
