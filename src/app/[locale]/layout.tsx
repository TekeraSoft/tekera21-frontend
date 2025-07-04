import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { getUser } from "../actions";
import AuthProvider from "@/context/AuthContext";
import { AxiosInterceptor } from "@/request/axiosClient";
import DialogProvider from "@/context/DialogContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Tekera21 Yönetim Paneli",
  description: "Tekera21 Teknoloji",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const user = await getUser();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={` antialiased`}>
        <StoreProvider>
          <AuthProvider user={user}>
            <NextIntlClientProvider>
              <AxiosInterceptor>
                <Toaster />
                <DialogProvider>{children}</DialogProvider>
              </AxiosInterceptor>
            </NextIntlClientProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
