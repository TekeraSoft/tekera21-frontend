import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import React from "react";

function SellerCalendar() {
  return (
    <div className="border p-1 rounded-md">
      <Button
        variant={"outline"}
        className={cn(
          "w-full pl-3 text-left font-normal text-muted-foreground"
        )}
      >
        <span>Pick a date</span>

        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
      <Calendar
        className=""
        captionLayout="dropdown"
        mode="single"
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
      />
    </div>
  );
}

export default SellerCalendar;
