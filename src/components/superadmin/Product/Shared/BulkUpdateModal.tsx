"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";

interface BulkUpdateModalProps {
  onBulkUpdate: (updates: BulkUpdateData) => void;
  totalCombinations: number;
}

export interface BulkUpdateData {
  stock?: number;
  price?: number;
  discountPrice?: number;
  generateSku: boolean;
  generateBarcode: boolean;
  updateFields: {
    stock: boolean;
    price: boolean;
    discountPrice: boolean;
    sku: boolean;
    barcode: boolean;
  };
}

export function BulkUpdateModal({
  onBulkUpdate,
  totalCombinations,
}: BulkUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [bulkData, setBulkData] = useState<BulkUpdateData>({
    stock: 50,
    price: 1449,
    discountPrice: 0,
    generateSku: true,
    generateBarcode: true,
    updateFields: {
      stock: true,
      price: true,
      discountPrice: false,
      sku: true,
      barcode: true,
    },
  });

  const handleApply = () => {
    onBulkUpdate(bulkData);
    setOpen(false);
  };

  const handleFieldToggle = (
    field: keyof BulkUpdateData["updateFields"],
    checked: boolean
  ) => {
    setBulkData((prev) => ({
      ...prev,
      updateFields: {
        ...prev.updateFields,
        [field]: checked,
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Toplu Güncelleme ({totalCombinations} özellik)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tüm bilgileri güncelle</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            Aşağıdaki değişiklikleri geçerli {totalCombinations} özellik için
            güncelle.
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update-stock"
                  checked={bulkData.updateFields.stock}
                  onCheckedChange={(checked) =>
                    handleFieldToggle("stock", checked as boolean)
                  }
                />
                <Label htmlFor="update-stock" className="text-sm font-medium">
                  Stok Güncelle
                </Label>
              </div>
              {bulkData.updateFields.stock && (
                <div>
                  <Label htmlFor="bulk-stock" className="text-sm">
                    Stok Adeti
                  </Label>
                  <Input
                    id="bulk-stock"
                    type="number"
                    value={bulkData.stock || ""}
                    onChange={(e) =>
                      setBulkData((prev) => ({
                        ...prev,
                        stock: Number(e.target.value),
                      }))
                    }
                    placeholder="Enter stock quantity"
                  />
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update-price"
                  checked={bulkData.updateFields.price}
                  onCheckedChange={(checked) =>
                    handleFieldToggle("price", checked as boolean)
                  }
                />
                <Label htmlFor="update-price" className="text-sm font-medium">
                  Fiyat Güncelle
                </Label>
              </div>
              {bulkData.updateFields.price && (
                <div>
                  <Label htmlFor="bulk-price" className="text-sm">
                    Fiyat
                  </Label>
                  <Input
                    id="bulk-price"
                    type="number"
                    value={bulkData.price || ""}
                    onChange={(e) =>
                      setBulkData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    placeholder="Enter price"
                  />
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update-discount"
                  checked={bulkData.updateFields.discountPrice}
                  onCheckedChange={(checked) =>
                    handleFieldToggle("discountPrice", checked as boolean)
                  }
                />
                <Label
                  htmlFor="update-discount"
                  className="text-sm font-medium"
                >
                  İndirlimli fiyatı güncelle
                </Label>
              </div>
              {bulkData.updateFields.discountPrice && (
                <div>
                  <Label htmlFor="bulk-discount" className="text-sm">
                    İndirimli fiyat
                  </Label>
                  <Input
                    id="bulk-discount"
                    type="number"
                    value={bulkData.discountPrice || ""}
                    onChange={(e) =>
                      setBulkData((prev) => ({
                        ...prev,
                        discountPrice: Number(e.target.value),
                      }))
                    }
                    placeholder="Enter discount price"
                  />
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update-sku"
                  checked={bulkData.updateFields.sku}
                  onCheckedChange={(checked) =>
                    handleFieldToggle("sku", checked as boolean)
                  }
                />
                <Label htmlFor="update-sku" className="text-sm font-medium">
                  Stok kodlarını yeniden oluştur.
                </Label>
              </div>
              {bulkData.updateFields.sku && (
                <div className="text-xs text-muted-foreground">
                  Stok kodları otomatik olarak oluşturulacaktır.
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update-barcode"
                  checked={bulkData.updateFields.barcode}
                  onCheckedChange={(checked) =>
                    handleFieldToggle("barcode", checked as boolean)
                  }
                />
                <Label htmlFor="update-barcode" className="text-sm font-medium">
                  Barkodları yeniden oluştur.
                </Label>
              </div>
              {bulkData.updateFields.barcode && (
                <div className="text-xs text-muted-foreground">
                  Barcodelar stok kodlarınıza göre otomatik oluşturulacaktır.
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleApply} className="flex-1">
              Onayla
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              İptal et
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
