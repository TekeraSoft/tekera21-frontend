"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SellerCargoCalculatorTab() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [desiResult, setDesiResult] = useState<number | null>(null);
  const [priceResult, setPriceResult] = useState<number | null>(null);

  const calculateDesi = () => {
    if (length && width && height) {
      const desi =
        (Number.parseFloat(length) *
          Number.parseFloat(width) *
          Number.parseFloat(height)) /
        3000;
      setDesiResult(Number.parseFloat(desi.toFixed(2)));
    }
  };

  const calculatePrice = () => {
    if (weight) {
      // This is a simplified calculation, actual pricing would depend on many factors
      const price = Number.parseFloat(weight) * 15; // Example rate: 15 TL per kg/desi
      setPriceResult(Number.parseFloat(price.toFixed(2)));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Desi Hesapla</h2>
        <div className="ml-2 text-gray-400 cursor-help">ⓘ</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="length" className="text-sm">
            En (Cm)
          </Label>
          <Input
            id="length"
            type="number"
            placeholder="En (Cm)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width" className="text-sm">
            Boy (Cm)
          </Label>
          <Input
            id="width"
            type="number"
            placeholder="Boy (Cm)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm">
            Yükseklik (Cm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="Yükseklik (Cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <Button
          onClick={calculateDesi}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Hesapla
        </Button>
      </div>

      {desiResult !== null && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Desi Sonucu:</span>
            <span className="font-bold">{desiResult} DS</span>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Kargo Fiyatı Hesapla</h2>

      <div className="space-y-2 mb-4">
        <Label htmlFor="weight" className="text-sm">
          Kg/Desi
        </Label>
        <Input
          id="weight"
          type="number"
          placeholder="Kg/Desi"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="flex justify-end mb-8">
        <Button
          onClick={calculatePrice}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Hesapla
        </Button>
      </div>

      {priceResult !== null && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Tahmini Fiyat:</span>
            <span className="font-bold">{priceResult} TL</span>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Desi Hesaplama:</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            Kargo fiyatlandırması desi ölçüsü ve ağırlığa göre yapılır. Paketin
            ağırlığı desiden fazla ise ağırlık ölçüsü baz alınır.
          </li>
          <li>
            Kargo Fiyatı Hesaplaması: Bu alandaki fiyatlar kargo partnerlerimiz
            tarafından tekera21 ile paylaşılan desi bazlı taşıma bedelleri
            doğrultusunda hesaplanmaktadır. Fiyatlara KDV dahil edilmemiştir.
          </li>
        </ul>
      </div>
    </div>
  );
}
