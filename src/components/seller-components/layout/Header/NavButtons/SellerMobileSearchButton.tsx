import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Search } from "lucide-react";
import React from "react";

function SellerMobileSearchButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className=" rounded-full"
          variant="default"
          size="icon"
          aria-label="Toggle alert"
        >
          <Search size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  );
}

export default SellerMobileSearchButton;
