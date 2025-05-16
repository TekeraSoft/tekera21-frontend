"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

import { Search, MoreHorizontal, Filter } from "lucide-react";
import { SellerUserEditDialog } from "./SellerUserEditDialog";
import { SellerUserDeleteDialog } from "./SellerUserDeleteDialog";

// Örnek kullanıcı verileri
const initialUsers = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    roles: ["orders", "products", "users"],
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "+90 555 987 6543",
    roles: ["seller", "products"],
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 555 456 7890",
    roles: ["sellerSuperAdmin", "analytics"],
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    email: "zeynep@example.com",
    phone: "+90 555 789 0123",
    roles: ["customers", "cargo", "user"],
  },
  {
    id: "5",
    name: "Mustafa Öztürk",
    email: "mustafa@example.com",
    phone: "+90 555 234 5678",
    roles: ["orders", "analytics"],
  },
];

// Rol renklerini tanımlama
const roleColors: Record<string, string> = {
  orders: "bg-blue-100 text-blue-800",
  products: "bg-green-100 text-green-800",
  users: "bg-purple-100 text-purple-800",
  cargo: "bg-yellow-100 text-yellow-800",
  analytics: "bg-indigo-100 text-indigo-800",
  customers: "bg-pink-100 text-pink-800",
  seller: "bg-orange-100 text-orange-800",
  sellerSuperAdmin: "bg-red-100 text-red-800",
  user: "bg-gray-100 text-gray-800",
};

export function SellerUsersTable() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const itemsPerPage = 5;

  // Arama ve filtreleme
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sayfalama
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Kullanıcı düzenleme
  const handleEditUser = (user: any) => {
    setUserToEdit(user);
    setIsEditOpen(true);
  };

  // Kullanıcı silme
  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  // Kullanıcı güncelleme
  const updateUser = (updatedUser: any) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditOpen(false);
  };

  // Kullanıcı silme
  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    setIsDeleteOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 px-1 md:px-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="İsim veya e-posta ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Rollere Göre Filtrele</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Tüm Roller</DropdownMenuItem>
            <DropdownMenuItem>Siparişler</DropdownMenuItem>
            <DropdownMenuItem>Ürünler</DropdownMenuItem>
            <DropdownMenuItem>Kullanıcılar</DropdownMenuItem>
            <DropdownMenuItem>Kargo</DropdownMenuItem>
            <DropdownMenuItem>Analitik</DropdownMenuItem>
            <DropdownMenuItem>Müşteriler</DropdownMenuItem>
            <DropdownMenuItem>Satıcı</DropdownMenuItem>
            <DropdownMenuItem>Satıcı Süper Admin</DropdownMenuItem>
            <DropdownMenuItem>Kullanıcı</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İsim</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead className="hidden md:block">Telefon</TableHead>
              <TableHead className="min-w-50">Roller</TableHead>
              <TableHead className="text-right">Aksiyonlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:flex">{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className={roleColors[role]}
                        >
                          {role === "orders" && "Siparişler"}
                          {role === "products" && "Ürünler"}
                          {role === "users" && "Kullanıcılar"}
                          {role === "cargo" && "Kargo"}
                          {role === "analytics" && "Analitik"}
                          {role === "customers" && "Müşteriler"}
                          {role === "seller" && "Satıcı"}
                          {role === "sellerSuperAdmin" && "Satıcı Süper Admin"}
                          {role === "user" && "Kullanıcı"}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menü</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          Rolleri Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600"
                        >
                          Kullanıcıyı Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {userToEdit && (
        <SellerUserEditDialog
          user={userToEdit}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSave={updateUser}
        />
      )}

      {userToDelete && (
        <SellerUserDeleteDialog
          user={userToDelete}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onDelete={() => deleteUser(userToDelete.id)}
        />
      )}
    </div>
  );
}
