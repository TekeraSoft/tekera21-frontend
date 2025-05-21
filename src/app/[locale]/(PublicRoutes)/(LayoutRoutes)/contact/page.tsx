"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import BuyerContactMap from "@/components/buyer-components/contact/BuyerContactMap";
import BuyerContactSSS from "@/components/buyer-components/contact/BuyerContactSSS";
import BuyerTekeraInfo from "@/components/buyer-components/contact/BuyerTekeraInfo";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log("Form data:", formData);
    alert("Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              İletişim
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl  text-white">
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için
              bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri ve Form */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* İletişim Bilgileri */}
            <BuyerTekeraInfo />
            {/* İletişim Formu */}
            <div className="mt-12 lg:mt-0">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Bize Mesaj Gönderin
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adınız Soyadınız
                    </label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      E-posta Adresiniz
                    </label>
                    <div className="mt-1">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Konu
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, subject: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sipariş Hakkında">
                          Sipariş Hakkında
                        </SelectItem>
                        <SelectItem value="Ürün Bilgisi">
                          Ürün Bilgisi
                        </SelectItem>
                        <SelectItem value="İade ve Değişim">
                          İade ve Değişim
                        </SelectItem>
                        <SelectItem value="İş Birliği">İş Birliği</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mesajınız
                    </label>
                    <div className="mt-1">
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></Textarea>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" size={"lg"}>
                      <Send className="h-5 w-5 mr-2" />
                      Gönder
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Harita */}
      <BuyerContactMap />

      {/* SSS */}
      <BuyerContactSSS />
    </div>
  );
}
