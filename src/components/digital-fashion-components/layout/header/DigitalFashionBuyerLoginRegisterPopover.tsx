"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";

function DigitalFashionBuyerLoginRegisterPopover() {
  const [open, setOpen] = useState(false);
  // Ekran yeniden boyutlandırıldığında popover'ı kapat
  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          size="sm"
          className="flex flex-col items-center px-2 py-1"
        >
          <span className="text-[11px] font-medium">Giriş Yap / Üye Ol</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-40 shadow-neutral-50 ">
        <Button variant={"primary"} size={"sm"} className="w-full text-[11px]">
          <Link href="/register">Üye Ol</Link>
        </Button>
        <Button size={"sm"} className="w-full text-[11px] mt-2">
          <Link href="/giris">Giriş Yap</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default DigitalFashionBuyerLoginRegisterPopover;
