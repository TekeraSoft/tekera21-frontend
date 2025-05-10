import type React from "react";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Profil - Belgeler",
  description: "Kullanıcı profili ve belge yönetimi",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5" />
            <span>Belge Yönetim Sistemi</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link
              href="/profile"
              className="text-sm font-medium hover:underline"
            >
              Profil
            </Link>
            <Link
              href="/profile/documents"
              className="text-sm font-medium hover:underline"
            >
              Belgeler
            </Link>
            <Link
              href="/profile/settings"
              className="text-sm font-medium hover:underline"
            >
              Ayarlar
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
