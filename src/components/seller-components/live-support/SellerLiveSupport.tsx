import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import React from "react";

function SellerSupport() {
  return (
    <div className="fixed bottom-0 left-32">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default">Canlı Destek</Button>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
}

export default SellerSupport;
