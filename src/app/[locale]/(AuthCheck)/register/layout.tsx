import type React from "react";
import type { Metadata } from "next";
import { FileText, LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getUser, logOut } from "@/app/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Profil - Belgeler",
  description: "Kullanıcı profili ve belge yönetimi",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="flex min-h-screen flex-col px-2 lg:px-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5" />
            <span>Belge Yönetim Sistemi</span>
          </Link>
          <Button onClick={logOut} variant={"outline"} className="flex gap-2">
            {user?.nameSurname} <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
