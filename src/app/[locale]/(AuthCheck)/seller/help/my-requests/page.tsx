"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { tr, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { useAppSelector } from "@/store/store";

import SellerHelpRequestsTable from "@/components/seller-components/help/SellerHelpRequestsTable";

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

export default function SellerCompanySupportTicketList() {
  const { SellerRequestsCompany } = useAppSelector(
    (state) => state.SellerRequests
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;

  // Filtreleme fonksiyonu
  const filteredTickets = SellerRequestsCompany.filter((ticket) => {
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

    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-primary underline underline-offset-8">
          Destek Taleplerim
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            <Input
              placeholder="Talep No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <Input placeholder="Sipariş Numarası" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mb-6">
          <Button variant="outline">Temizle</Button>
          <Button className="bg-navy-700 hover:bg-navy-800">Filtrele</Button>
        </div>

        <SellerHelpRequestsTable
          filteredTickets={filteredTickets}
          dateFnsLocale={dateFnsLocale}
        />

        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button variant="default" size="sm">
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
