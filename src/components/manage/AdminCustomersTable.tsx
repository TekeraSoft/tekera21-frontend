"use client";

import {
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  Mail,
  UserCog,
  Trash2,
  RotateCcwKeyIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Link } from "@/i18n/navigation";

import { IPageableData } from "@/types/PageableData";
import { IUser } from "@/types/UserTypes/user";

export function AdminCustomersTable({
  userData,
}: {
  userData: IPageableData<IUser>;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
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
            <TableHead>ID</TableHead>
            <TableHead>Cinsiyet</TableHead>
            <TableHead>Son giriş tarihi</TableHead>
            <TableHead>Rolü</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.content.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={customer.email || "/placeholder.svg"}
                      alt={customer.firstName}
                    />
                    <AvatarFallback>
                      {customer.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{customer.lastLoginDate}</TableCell>
              <TableCell>{customer.roles.join(", ")}</TableCell>
              {/* <TableCell>
                <Badge
                  className={getStatusColor(customer.status)}
                  variant="outline"
                >
                  {customer.status}
                </Badge>
              </TableCell> */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      DetaylarınıGör
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCcwKeyIcon className="mr-2 h-4 w-4" />
                      Rol Değiştir
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        className="flex items-center"
                        href={`/manage/customers/${customer.id}`}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Düzenle
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
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
  );
}
