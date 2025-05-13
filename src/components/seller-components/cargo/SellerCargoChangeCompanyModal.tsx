"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChangeCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangeCompanyModal({
  isOpen,
  onClose,
}: ChangeCompanyModalProps) {
  const [cargoCompany, setCargoCompany] = useState("");
  const [changeReason, setChangeReason] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log({ cargoCompany, changeReason, explanation });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            KARGO FİRMASI SEÇ
          </DialogTitle>
        </DialogHeader>

        <div className=" border-l-4   p-4 mb-4">
          <p className="text-sm">
            Eğer kendi kargo anlaşmanız ile çalışıyorsanız, yaptığınız
            değişiklik sonrası tekera21 anlaşmalı kargo modeline geçişiniz
            sağlanacaktır.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="cargoCompany" className="text-sm font-medium">
                Kargo Firması
              </Label>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </div>
            <Select value={cargoCompany} onValueChange={setCargoCompany}>
              <SelectTrigger id="cargoCompany" className="w-full">
                <SelectValue placeholder="Seçim Yapınız" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mng">MNG Kargo</SelectItem>
                <SelectItem value="aras">Aras Kargo</SelectItem>
                <SelectItem value="ptt">PTT Kargo</SelectItem>
                <SelectItem value="surat">Sürat Kargo</SelectItem>
                <SelectItem value="yurtici">Yurtiçi Kargo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="changeReason" className="text-sm font-medium">
              Değişiklik Sebebi
            </Label>
            <Select value={changeReason} onValueChange={setChangeReason}>
              <SelectTrigger id="changeReason" className="w-full">
                <SelectValue placeholder="Seçim Yapınız" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Fiyat Avantajı</SelectItem>
                <SelectItem value="service">Hizmet Kalitesi</SelectItem>
                <SelectItem value="coverage">Kapsama Alanı</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation" className="text-sm font-medium">
              Açıklama
            </Label>
            <Textarea
              id="explanation"
              placeholder="Açıklama"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full  text-white" onClick={handleSubmit}>
            DEĞİŞTİR & ONAYLA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
