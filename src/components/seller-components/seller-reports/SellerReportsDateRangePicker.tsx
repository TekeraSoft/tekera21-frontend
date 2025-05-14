"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DateRangePickerProps {
  className?: string;
  defaultValue?: DateRange;
}

export function SellerReportsDateRangePicker({
  className,
  defaultValue,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(defaultValue);
  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: dateFnsLocale })} -{" "}
                  {format(date.to, "dd/MM/yyyy", { locale: dateFnsLocale })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: dateFnsLocale })
              )
            ) : (
              <span>Tarih Aralığı Seçin</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={tr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
