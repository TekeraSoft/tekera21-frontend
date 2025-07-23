"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import QRCode from "react-qr-code";

const QrCodeViewer = ({ targetId }: { targetId: string }) => {
  const qrValue = targetId
    ? `${process.env.NEXT_PUBLIC_AR_BASE_URL}?id=${targetId}`
    : null;
  return (
    <div className="flex justify-center w-full">
      {qrValue ? (
        <div className="lg:w-28 w-20 lg:h-32 h-24 col-span-1 col-start-6 mr-2">
          <QRCode
            id="QRCode"
            size={256}
            style={{ height: "auto", width: "100%" }}
            value={qrValue}
            viewBox={`0 0 256 256`}
          />
          <Button
            variant={"darkSoft"}
            type="button"
            value="Download QR"
            className="cursor-pointer mt-2"
            onClick={() => {
              const svg = document.getElementById("QRCode");
              if (!svg) return;
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                if (ctx) {
                  ctx.drawImage(img, 0, 0);
                  const pngFile = canvas.toDataURL("image/png");
                  const downloadLink = document.createElement("a");
                  downloadLink.download = targetId;
                  downloadLink.href = `${pngFile}`;
                  downloadLink.click();
                }
              };
              img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
            }}
          >
            Download QR
          </Button>
        </div>
      ) : (
        <div>Qr Değer oluşturulamadı.</div>
      )}
    </div>
  );
};

export default QrCodeViewer;
