"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SellerUserCreateDialog } from "./SellerUserCreateDialog";

export function SellerUserCreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Kullanıcı Ekle
      </Button>
      <SellerUserCreateDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
