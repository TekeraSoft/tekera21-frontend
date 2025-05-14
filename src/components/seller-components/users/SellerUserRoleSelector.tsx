"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Kullanılabilir roller
const availableRoles = [
  { value: "orders", label: "Siparişler" },
  { value: "products", label: "Ürünler" },
  { value: "users", label: "Kullanıcılar" },
  { value: "cargo", label: "Kargo" },
  { value: "analytics", label: "Analitik" },
  { value: "customers", label: "Müşteriler" },
  { value: "seller", label: "Satıcı" },
  { value: "sellerSuperAdmin", label: "Satıcı Süper Admin" },
  { value: "user", label: "Kullanıcı" },
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

interface RoleSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function SellerUserRoleSelector({ value, onChange }: RoleSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (role: string) => {
    if (value.includes(role)) {
      onChange(value.filter((r) => r !== role));
    } else {
      onChange([...value, role]);
    }
  };

  const handleRemove = (role: string) => {
    onChange(value.filter((r) => r !== role));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Rol seçin
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Rol ara..." />
            <CommandList>
              <CommandEmpty>Rol bulunamadı.</CommandEmpty>
              <CommandGroup>
                {availableRoles.map((role) => (
                  <CommandItem
                    key={role.value}
                    onSelect={() => handleSelect(role.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(role.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {role.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((role) => {
            const roleInfo = availableRoles.find((r) => r.value === role);
            return (
              <Badge key={role} variant="outline" className={roleColors[role]}>
                {roleInfo?.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => handleRemove(role)}
                >
                  <span className="sr-only">Kaldır</span>
                  <span className="text-xs">×</span>
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
