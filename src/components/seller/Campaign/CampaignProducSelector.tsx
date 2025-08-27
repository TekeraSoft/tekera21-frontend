"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Star } from "lucide-react";
import { IProduct } from "@/types/product";
import { ICampaign } from "@/types/AdminTypes/campaign";
import ImageView from "@/components/shared/ImageView";

interface ProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ICampaign;
  availableProducts: IProduct[];
  onAddProducts: (campaignId: string, selectedProducts: IProduct[]) => void;
  type: "add" | "remove";
}

export function ProductSelector({
  isOpen,
  onClose,
  campaign,
  availableProducts,
  onAddProducts,
  type,
}: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  const products =
    type === "add"
      ? availableProducts.filter(
          (product) => !campaign.products?.some((p) => p.id === product.id)
        )
      : campaign.products;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ("modelCode" in product &&
        product.modelCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleAddSelected = () => {
    const productsToAdd = availableProducts.filter((product) =>
      selectedProducts.has(product.id)
    );
    onAddProducts(campaign.id, productsToAdd);
    setSelectedProducts(new Set());
    setSearchTerm("");
  };

  const handleClose = () => {
    setSelectedProducts(new Set());
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Ürün Seç - {campaign.name}</DialogTitle>
          <DialogDescription>
            Bu {type === "add" ? "kampanyaya eklemek" : "kampanyadan çıkarmak"}{" "}
            istediğiniz ürünleri seçin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Ürün adı, marka veya kod ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 h-96">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Eklenebilecek ürün bulunamadı</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors overflow-y-auto"
                >
                  <Checkbox
                    checked={selectedProducts.has(product.id)}
                    onCheckedChange={() => handleProductToggle(product.id)}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          {"image" in product && (
                            <ImageView
                              imageInfo={{
                                name: product.name,
                                url: product.image,
                              }}
                              className="w-10 h-10 object-contain"
                            />
                          )}
                          <h4 className="font-medium text-sm">
                            {product.name}
                          </h4>
                        </div>
                        {type === "add" && (
                          <>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>
                                {"brandName" in product && product.brandName}
                              </span>
                              <span>•</span>
                              <span>{"code" in product && product.code}</span>
                              {"rate" in product && product.rate > 0 && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{product.rate}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {"description" in product && product.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {"category" in product &&
                                typeof product.category === "string"
                                  ? product.category
                                  : "category" in product &&
                                    product.category.name}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {"productType" in product &&
                                  product.productType}
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="text-right">
                        <p>{"modelCode" in product && product.modelCode}</p>
                      </div>

                      {/* <div className="text-right">
                        <p className="font-semibold text-primary">
                          ₺
                          {product.variations[0].attributes[0].price.toFixed(2)}
                        </p>
                        {product.variations[0].attributes[0].discountPrice >
                          0 && (
                          <p className="text-xs text-muted-foreground line-through">
                            ₺
                            {product.variations[0].attributes[0].discountPrice.toFixed(
                              2
                            )}
                          </p>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedProducts.size} ürün seçildi
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              İptal
            </Button>
            <Button
              onClick={handleAddSelected}
              disabled={selectedProducts.size === 0}
            >
              Seçili Ürünleri {type === "add" ? "Ekle" : "Çıkar"} (
              {selectedProducts.size})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
