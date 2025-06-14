"use client";

import { useAppSelector } from "@/store/store";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MsgType {
  sender: "buyer" | "seller";
  content: string;
  createdAt: string;
}

const statusBadge = (status: string) => {
  const base = "px-2 py-1 text-xs rounded-full font-medium";
  switch (status) {
    case "pending":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-800`}>
          Beklemede
        </span>
      );
    case "resolved":
      return (
        <span className={`${base} bg-green-100 text-green-800`}>Çözüldü</span>
      );
    case "rejected":
      return (
        <span className={`${base} bg-red-100 text-red-800`}>Reddedildi</span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>
      );
  }
};

const SellerBuyerHelpRequestDetail = () => {
  const { id } = useParams() as { id: string };
  const { SellerRequestsBuyer } = useAppSelector(
    (state) => state.SellerRequests
  );

  const localeString = useLocale();
  const dateFnsLocale = localeString === "tr" ? tr : enUS;

  const ticket = SellerRequestsBuyer.find((ticket) => ticket.id === id);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MsgType[]>(ticket?.messages || []);

  if (!ticket) {
    return (
      <div className="text-center text-red-600">Destek talebi bulunamadı.</div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedMessages: MsgType[] = [
      ...messages,
      {
        sender: "seller",
        content: newMessage,
        createdAt: new Date().toISOString(),
      },
    ];

    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <SellerInnerContainer>
      <div className="space-y-6">
        {/* Destek Talebi Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle>Destek Talebi #{ticket.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Konu:</strong> {ticket.subject}
            </p>
            <p>
              <strong>Tarih:</strong>{" "}
              {format(new Date(ticket.createdAt), "dd MMMM yyyy", {
                locale: dateFnsLocale,
              })}
            </p>
            <p>
              <strong>Durum:</strong> {statusBadge(ticket.status)}
            </p>
            <p>
              <strong>Sipariş No:</strong> {ticket.orderNumber}
            </p>
            <p>
              <strong>Açıklama:</strong> {ticket.description}
            </p>
          </CardContent>
        </Card>

        {/* Mesajlar */}
        <Card>
          <CardHeader>
            <CardTitle>Mesajlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm max-w-md ${
                  msg.sender === "buyer"
                    ? "bg-gray-100 text-left self-start"
                    : "bg-blue-100 text-right self-end ml-auto"
                }`}
              >
                <p>{msg.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {format(new Date(msg.createdAt), "dd MMM yyyy HH:mm", {
                    locale: dateFnsLocale,
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mesaj Gönderme Alanı */}
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Yanıtınızı yazın..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={handleSendMessage}
            className="flex items-center gap-1"
          >
            <Send size={16} />
            Gönder
          </Button>
        </div>
      </div>
    </SellerInnerContainer>
  );
};

export default SellerBuyerHelpRequestDetail;
