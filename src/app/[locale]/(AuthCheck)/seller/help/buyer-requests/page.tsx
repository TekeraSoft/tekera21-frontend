"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { useAppSelector } from "@/store/store";

// Durum seçenekleri
const statusOptions = [
  { value: "all", label: "Tümü" },
  { value: "open", label: "Açık" },
  { value: "closed", label: "Kapalı" },
];

// Konu seçenekleri
const subjectOptions = [
  { value: "all", label: "Tümü" },
  { value: "urun", label: "ÜRÜN" },
  { value: "operasyon", label: "OPERASYON" },
  { value: "siparis", label: "SİPARİŞ" },
  { value: "teknik", label: "TEKNİK DESTEK" },
  { value: "diger", label: "DİĞER" },
];

export default function SellerBuyerRequestSupportTicketList() {
  const { SellerRequestsBuyer } = useAppSelector(
    (state) => state.SellerRequests
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;

  // Filtreleme fonksiyonu
  const filteredTickets = SellerRequestsBuyer.filter((ticket) => {
    // Arama terimi filtresi
    if (
      searchTerm &&
      !ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      const isOpen = ticket.status !== "Talep sonuçlandırıldı";
      if (
        (selectedStatus === "open" && !isOpen) ||
        (selectedStatus === "closed" && isOpen)
      ) {
        return false;
      }
    }

    // Konu filtresi
    if (
      selectedSubject !== "all" &&
      !(selectedSubject === "urun" && ticket.subject === "ÜRÜN") &&
      !(selectedSubject === "operasyon" && ticket.subject === "OPERASYON")
    ) {
      return false;
    }

    // Tarih filtresi
    if (startDate && ticket.createdAt < startDate) {
      return false;
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (ticket.createdAt > endOfDay) {
        return false;
      }
    }

    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-orange-500">
          Destek Taleplerim
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Input
              placeholder="Talep No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <Input placeholder="Sipariş Numarası" />
          </div>

          <div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Konu" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate
                    ? format(startDate, "dd.MM.yyyy", { locale: dateFnsLocale })
                    : "Oluşturma Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate
                    ? format(endDate, "dd.MM.yyyy", { locale: dateFnsLocale })
                    : "Çözüm Tarihi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mb-6">
          <Button variant="outline">Temizle</Button>
          <Button className="bg-navy-700 hover:bg-navy-800">Filtrele</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talep No</TableHead>
                <TableHead>Oluşturma Tarihi</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Çözüm Açıklaması</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      {format(ticket.createdAt, "dd.MM.yyyy HH:mm", {
                        locale: dateFnsLocale,
                      })}
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {ticket.description}
                    </TableCell>
                    <TableCell>{ticket.orderNumber}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-50"
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {ticket.solution}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Destek talebi bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-navy-700 text-white hover:bg-navy-800"
          >
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Sonraki
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
