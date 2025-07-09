"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Video, X } from "lucide-react";

interface FileUploadProps {
  name: string;
  accept: string;
  label: string;
  description: string;
  icon: "image" | "video";
  setFile: (file: File | null) => void;
  file: File | null;
}

export function FileUploadEnhanced({
  name,
  accept,
  label,
  description,
  icon,
  setFile,
  file,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (accept === ".mp4,video/mp4") {
        if (file.type !== "video/mp4") {
          alert("Sadece .mp4 video dosyası yükleyebilirsin!");
          return;
        }

        if (!file.name.endsWith(".mp4")) {
          alert("Lütfen .mp4 uzantılı bir dosya seç!");
          return;
        }
      }
      setFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      // Update the hidden input
      const input = document.getElementById(name) as HTMLInputElement;
      if (input) {
        const dt = new DataTransfer();
        dt.items.add(e.dataTransfer.files[0]);
        input.files = dt.files;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const clearFile = () => {
    setFile(null);
    const input = document.getElementById(name) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const IconComponent = icon === "image" ? ImageIcon : Video;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById(name)?.click()}
          className={`flex items-center justify-center w-full  border-2 border-dashed rounded-lg cursor-pointer transition-colors min-h-40 px-2 ${
            dragOver
              ? "border-primary bg-primary/5"
              : file
              ? "border-green-500 bg-green-50"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
        >
          <div className="text-center">
            {file ? (
              <div className="flex items-center gap-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt="image"
                  className="w-52 h-full pr-3"
                />
                <div>
                  <p className="text-sm font-medium text-green-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="ml-2 p-1 hover:bg-red-100 rounded-full"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ) : (
              <>
                <IconComponent className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {dragOver
                    ? "Drop file here"
                    : `Click to upload ${icon} or drag and drop`}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
