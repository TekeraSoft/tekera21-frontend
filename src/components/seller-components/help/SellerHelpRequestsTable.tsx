import React from "react";
import Link from "next/link"; // Eğer Next.js kullanıyorsan
import { format, Locale } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  createdAt: Date | string;
  subject: string;
  description: string;
  orderNumber: string;
  status: string;
  solution: string;
}

interface Props {
  filteredTickets: Ticket[];
  dateFnsLocale: Locale;
}

const SellerHelpRequestsTable: React.FC<Props> = ({
  filteredTickets,
  dateFnsLocale,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex-center min-w-24">Talep No</TableHead>
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
              <TableRow className="hover:bg-teal-100" key={ticket.id}>
                <TableCell className="font-medium ">
                  <span className="min-w-10 h-8 flex-center bg-primary text-white rounded-full px-1 ">
                    #{ticket.id}
                  </span>
                </TableCell>
                <TableCell className="text-xs md:text-base">
                  {format(new Date(ticket.createdAt), "dd.MM.yyyy HH:mm", {
                    locale: dateFnsLocale,
                  })}
                </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {ticket.description}
                </TableCell>
                <TableCell>{ticket.orderNumber}</TableCell>
                <TableCell className="min-w-48">
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
                    <Link href={`my-request-detail/${ticket.id}`}>Detay</Link>
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
  );
};

export default SellerHelpRequestsTable;
