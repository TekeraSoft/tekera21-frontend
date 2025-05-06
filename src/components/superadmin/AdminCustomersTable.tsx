"use client"

import { useState } from "react"
import { MoreHorizontal, ArrowUpDown, Eye, Mail, UserCog, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminCustomersTable() {
    
  const [customers, setCustomers] = useState([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "New York, USA",
      orders: 12,
      spent: "$1,248.50",
      status: "Active",
      lastOrder: "May 4, 2023",
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "London, UK",
      orders: 8,
      spent: "$945.20",
      status: "Active",
      lastOrder: "May 2, 2023",
    },
    {
      id: "CUST-003",
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Toronto, Canada",
      orders: 5,
      spent: "$532.00",
      status: "Active",
      lastOrder: "April 28, 2023",
    },
    {
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Sydney, Australia",
      orders: 3,
      spent: "$165.25",
      status: "Inactive",
      lastOrder: "March 15, 2023",
    },
    {
      id: "CUST-005",
      name: "Robert Wilson",
      email: "robert@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Berlin, Germany",
      orders: 7,
      spent: "$819.99",
      status: "Active",
      lastOrder: "April 30, 2023",
    },
    {
      id: "CUST-006",
      name: "Jennifer Taylor",
      email: "jennifer@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Paris, France",
      orders: 4,
      spent: "$349.95",
      status: "Active",
      lastOrder: "April 25, 2023",
    },
    {
      id: "CUST-007",
      name: "David Miller",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Chicago, USA",
      orders: 6,
      spent: "$578.50",
      status: "Active",
      lastOrder: "May 1, 2023",
    },
    {
      id: "CUST-008",
      name: "Lisa Anderson",
      email: "lisa@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Madrid, Spain",
      orders: 2,
      spent: "$134.99",
      status: "Inactive",
      lastOrder: "February 12, 2023",
    },
    {
      id: "CUST-009",
      name: "James Wilson",
      email: "james@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Tokyo, Japan",
      orders: 9,
      spent: "$925.00",
      status: "Active",
      lastOrder: "April 29, 2023",
    },
    {
      id: "CUST-010",
      name: "Patricia Moore",
      email: "patricia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      location: "Rome, Italy",
      orders: 1,
      spent: "$59.99",
      status: "Active",
      lastOrder: "April 20, 2023",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing <strong>10</strong> of <strong>100</strong> customers
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center">
                Customer
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>{customer.spent}</TableCell>
              <TableCell>{customer.lastOrder}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(customer.status)} variant="outline">
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
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
                      <Mail className="mr-2 h-4 w-4" />
                      Send email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserCog className="mr-2 h-4 w-4" />
                      Edit customer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete customer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
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
  )
}
