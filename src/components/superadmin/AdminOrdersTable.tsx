"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminOrdersTable() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Smith",
      date: "May 4, 2023",
      total: "$125.99",
      status: "Delivered",
      payment: "Paid",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      date: "May 4, 2023",
      total: "$89.50",
      status: "Processing",
      payment: "Paid",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      date: "May 3, 2023",
      total: "$432.00",
      status: "Shipped",
      payment: "Paid",
      items: 5,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "May 3, 2023",
      total: "$65.25",
      status: "Pending",
      payment: "Pending",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Robert Wilson",
      date: "May 2, 2023",
      total: "$219.99",
      status: "Delivered",
      payment: "Paid",
      items: 2,
    },
    {
      id: "ORD-006",
      customer: "Jennifer Taylor",
      date: "May 2, 2023",
      total: "$149.95",
      status: "Cancelled",
      payment: "Refunded",
      items: 3,
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      date: "May 1, 2023",
      total: "$78.50",
      status: "Delivered",
      payment: "Paid",
      items: 2,
    },
    {
      id: "ORD-008",
      customer: "Lisa Anderson",
      date: "May 1, 2023",
      total: "$34.99",
      status: "Delivered",
      payment: "Paid",
      items: 1,
    },
    {
      id: "ORD-009",
      customer: "James Wilson",
      date: "April 30, 2023",
      total: "$125.00",
      status: "Shipped",
      payment: "Paid",
      items: 4,
    },
    {
      id: "ORD-010",
      customer: "Patricia Moore",
      date: "April 30, 2023",
      total: "$59.99",
      status: "Processing",
      payment: "Paid",
      items: 1,
    },
  ]);

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
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Filter payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing <strong>10</strong> of <strong>120</strong> orders
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center">
                Order ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="outline"
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={getPaymentColor(order.payment)}
                  variant="outline"
                >
                  {order.payment}
                </Badge>
              </TableCell>
              {/* <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PackageCheck className="mr-2 h-4 w-4" />
                      Update status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Ban className="mr-2 h-4 w-4" />
                      Cancel order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </Card>
  );
}
