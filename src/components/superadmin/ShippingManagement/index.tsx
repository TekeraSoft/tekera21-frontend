"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IShippingCompany } from "@/types/SellerTypes/ShippingCompanies";
import { createShippingCompany } from "@/app/actions";

export default function ShippingManagement({
  shippingCompanies,
}: {
  shippingCompanies: IShippingCompany[] | undefined;
}) {
  const [formData, setFormData] = useState<IShippingCompany>({
    id: "",
    name: "",
    price: 0,
    gsmNumber: "",
    email: "",
    maxDeliveryDay: 0,
    minDeliveryDay: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    field: keyof IShippingCompany,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    const { success, message } = await createShippingCompany(formData);

    if (success) {
      setFormData({
        name: "",
        price: 0,
        maxDeliveryDay: 0,
        gsmNumber: "",
        email: "",
        minDeliveryDay: 0,
      });
      setIsDialogOpen(false);
    } else {
      console.log("message", message);
    }
  };

  const handleEdit = (company: IShippingCompany) => {
    setFormData(company);
    setEditingId(company.id || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {};

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      gsmNumber: "",
      email: "",
      maxDeliveryDay: 0,
      minDeliveryDay: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kargo Firmaları</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Firma Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingId
                  ? "Kargo Firmasını Düzenle"
                  : "Yeni Kargo Firması Ekle"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Aşağıdaki kargo şirketi bilgilerini güncelleyin."
                  : "Yeni kargo şirketinin bilgilerini girin."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Firma Adı</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Firma Adı girin"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">İletişim Numarası</Label>
                  <Input
                    id="gsmNumber"
                    value={formData.gsmNumber}
                    onChange={(e) =>
                      handleInputChange("gsmNumber", e.target.value)
                    }
                    placeholder="İletişim numarası"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">E Posta Adresi</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    placeholder="E Posta adresi"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Fiyat</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="minDelivery">Minimum gönderi günü</Label>
                    <Input
                      id="minDelivery"
                      type="number"
                      min="1"
                      value={formData.minDeliveryDay}
                      onChange={(e) =>
                        handleInputChange(
                          "minDeliveryDay",
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="1"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxDelivery">Maksimum gönderi günü</Label>
                    <Input
                      id="maxDelivery"
                      type="number"
                      min="1"
                      value={formData.maxDeliveryDay}
                      onChange={(e) =>
                        handleInputChange(
                          "maxDeliveryDay",
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="7"
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit">{editingId ? "Güncelle" : "Ekle"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Kargo Firmaları listesi
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {shippingCompanies?.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Şu an hiçbir kargo firması yok.
              </h3>
              <p className="text-muted-foreground">
                Yeni kargo firmasını ekleyin.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firma Adı</TableHead>
                  <TableHead>Kargo Ücreti</TableHead>
                  <TableHead>Teslim Süresi</TableHead>
                  <TableHead className="text-right">Düzenle/Sil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingCompanies?.map((company) => (
                  <TableRow key={company.name}>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {company.price.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">
                          {company.minDeliveryDay === company.maxDeliveryDay
                            ? `${company.minDeliveryDay} gün${
                                company.minDeliveryDay > 1 ? "s" : ""
                              }`
                            : `${company.minDeliveryDay}-${company.maxDeliveryDay} gün`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(company)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => company.id && handleDelete(company.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
