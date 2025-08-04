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

export interface IShippingCompany {
  id?: number;
  name: string;
  price: number;
  maxDeliveryDay: number;
  minDeliveryDay: number;
}

export default function ShippingManagement() {
  const [shippingCompanies, setShippingCompanies] = useState<
    IShippingCompany[]
  >([
    {
      id: 1,
      name: "MNG",
      price: 25.99,
      maxDeliveryDay: 3,
      minDeliveryDay: 1,
    },
    {
      id: 2,
      name: "FedEx Standard",
      price: 18.5,
      maxDeliveryDay: 5,
      minDeliveryDay: 3,
    },
    {
      id: 3,
      name: "UPS Ground",
      price: 12.75,
      maxDeliveryDay: 7,
      minDeliveryDay: 5,
    },
  ]);

  const [formData, setFormData] = useState<IShippingCompany>({
    name: "",
    price: 0,
    maxDeliveryDay: 0,
    minDeliveryDay: 0,
  });

  const [editingId, setEditingId] = useState<number | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    if (editingId) {
      // Update existing company
      setShippingCompanies((prev) =>
        prev.map((company) =>
          company.id === editingId ? { ...formData, id: editingId } : company
        )
      );
      setEditingId(null);
    } else {
      // Add new company
      const newCompany: IShippingCompany = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      setShippingCompanies((prev) => [...prev, newCompany]);
    }

    // Reset form
    setFormData({
      name: "",
      price: 0,
      maxDeliveryDay: 0,
      minDeliveryDay: 0,
    });
    setIsDialogOpen(false);
  };

  const handleEdit = (company: IShippingCompany) => {
    setFormData(company);
    setEditingId(company.id || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setShippingCompanies((prev) => prev.filter((company) => company.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      maxDeliveryDay: 0,
      minDeliveryDay: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Shipping Companies
          </h1>
          <p className="text-muted-foreground">
            Manage your shipping company options and pricing
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingId
                  ? "Edit Shipping Company"
                  : "Add New Shipping Company"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Update the shipping company details below."
                  : "Enter the details for the new shipping company."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
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
                    <Label htmlFor="minDelivery">Min Delivery (days)</Label>
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
                    <Label htmlFor="maxDelivery">Max Delivery (days)</Label>
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
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? "Update Company" : "Add Company"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Shipping Companies List
          </CardTitle>
          <CardDescription>
            {shippingCompanies.length} shipping{" "}
            {shippingCompanies.length === 1 ? "company" : "companies"}{" "}
            configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          {shippingCompanies.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                No shipping companies
              </h3>
              <p className="text-muted-foreground">
                Get started by adding your first shipping company.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Delivery Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        ${company.price.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">
                          {company.minDeliveryDay === company.maxDeliveryDay
                            ? `${company.minDeliveryDay} day${
                                company.minDeliveryDay > 1 ? "s" : ""
                              }`
                            : `${company.minDeliveryDay}-${company.maxDeliveryDay} days`}
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
