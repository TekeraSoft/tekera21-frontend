import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Resizer from "react-image-file-resizer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const resizeImage = (file: File) => {
  const fileResized = new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      920, // ✅ Genişlik
      1840, // ✅ Yükseklik
      "WEBP", // ✅ Format (PNG, WEBP de olabilir)
      100, // ✅ Kalite (0-100 arasında)
      0, // ✅ Rotasyon
      (resizedFile) => {
        // Ensure resizedFile is a Blob or File, not a ProgressEvent
        if (resizedFile instanceof Blob || resizedFile instanceof File) {
          resolve(new File([resizedFile], file.name, { type: file.type }));
        } else if (
          resizedFile &&
          typeof resizedFile === "object" &&
          "target" in resizedFile &&
          (resizedFile as ProgressEvent<FileReader>).target?.result
        ) {
          // If it's a ProgressEvent, extract the result as a Blob
          const result = (resizedFile as ProgressEvent<FileReader>).target
            ?.result;
          if (result instanceof ArrayBuffer) {
            resolve(new File([result], file.name, { type: file.type }));
          } else if (typeof result === "string") {
            // If result is a base64 string, convert to Blob
            const arr = result.split(",");
            const mime = arr[0].match(/:(.*?);/)?.[1] || file.type;
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            resolve(new File([u8arr], file.name, { type: mime }));
          } else {
            resolve(file);
          }
        } else {
          resolve(file);
        }
      },
      "file" // ✅ Çıktıyı doğrudan File olarak al
    );
  });
  return fileResized as Promise<File>;
};