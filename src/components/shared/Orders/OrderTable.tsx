"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderData } from "@/types/OrderTypes";
import ImageView from "../ImageView";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Shipped":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Refunded":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function OrderTable({ orderData }: { orderData: IOrderData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleRowExpansion = (orderId: string) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and search logic
  // const filteredOrders = orderData.content.filter((order) => {
  //   const matchesSearch =
  //     order.sellerOrders.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     `${order.buyer.name} ${order.buyer.surname}`
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());

  //   const matchesStatus =
  //     statusFilter === "all" || order.status === statusFilter;
  //   const matchesPayment =
  //     paymentFilter === "all" || order.status === paymentFilter;

  //   return matchesSearch && matchesStatus && matchesPayment;
  // });

  // const totalItems = filteredOrders.length;
  // const itemsPerPage = 10;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentOrders = filteredOrders.slice(startIndex, endIndex);
  console.log("orderdayta", orderData);

  const totalPages = orderData.page.totalPages;
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tüm Siparişler</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-600">
          {/* Showing {Math.min(startIndex + 1, totalItems)} to{" "}
          {Math.min(endIndex, totalItems)} of {totalItems} orders */}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("orderNumber")}
                  className="flex items-center space-x-1 p-0 h-auto font-medium"
                >
                  <span>Sipariş Id'si</span>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Ürünler</TableHead>
              <TableHead>Toplam</TableHead>
              {/* <TableHead>Statü</TableHead>
              <TableHead>Ödeme</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.content.map((order) => {
              return (
                <React.Fragment key={order.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(order.id)}
                        className="p-1"
                      >
                        {expandedRows.includes(order.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {order.buyer.name} {order.buyer.surname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.buyer.gsmNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p> Oluşturulma: {formatDate(order.createdAt)}</p>
                      <p> Güncellenme: {formatDate(order.updatedAt)}</p>
                    </TableCell>
                    <TableCell>{order.basketItems.length}</TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.totalPrice)}
                    </TableCell>
                    {/* <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell> */}
                  </TableRow>

                  {/* Expanded Row Content */}
                  {expandedRows.includes(order.id) && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-gray-50 p-6">
                        <div className="space-y-6">
                          {/* Shipping Address */}
                          <div>
                            <h4 className="font-semibold mb-2">Kargo Adresi</h4>
                            <p className="text-sm text-gray-600">
                              {order.shippingAddress.street}{" "}
                              {order.shippingAddress.buildNo}/
                              {order.shippingAddress.doorNumber},{" "}
                              {order.shippingAddress.detailAddress},{" "}
                              {order.shippingAddress.postalCode}{" "}
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.country}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Fatura Adresi
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.billingAddress.street}{" "}
                              {order.billingAddress.buildNo}/
                              {order.billingAddress.doorNumber},{" "}
                              {order.billingAddress.detailAddress},{" "}
                              {order.billingAddress.postalCode}{" "}
                              {order.billingAddress.city},{" "}
                              {order.billingAddress.country}
                            </p>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold mb-3">Ürünler</h4>
                            <div className="space-y-3">
                              {order.basketItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center space-x-4 bg-white p-4 rounded-lg border"
                                >
                                  <ImageView
                                    imageInfo={{
                                      url: item.image,
                                      name: item.name,
                                    }}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium">{item.name}</h5>
                                    <p className="text-sm text-gray-600">
                                      {item.brandName} • {item.modelCode}
                                    </p>
                                    <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                                      <span>Adet: {item.quantity}</span>
                                      <span>SKU: {item.sku}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {item.attributes.map((attr, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {attr.key}: {attr.value}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">
                                      {formatPrice(item.price)}
                                    </p>
                                    {item.shippingPrice > 0 && (
                                      <p className="text-sm text-gray-500">
                                        Kargo ücreti:{" "}
                                        {formatPrice(item.shippingPrice)}
                                      </p>
                                    )}
                                    <p className="text-xs text-gray-400">
                                      {item.shippingCompanyName}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Önceki
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          {totalPages > 5 && (
            <>
              <span className="px-2">...</span>
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}
