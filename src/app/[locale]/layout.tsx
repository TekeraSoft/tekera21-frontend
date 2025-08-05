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
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/providers/ReactQuery";

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

  const queryClient = new QueryClient();
  const user = await getUser();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={` antialiased`}>
        <StoreProvider>
          <AuthProvider user={user}>
            <NextIntlClientProvider>
              <AxiosInterceptor>
                <ReactQueryProvider dehydratedState={dehydratedState}>
                  <Toaster />
                  <DialogProvider>{children}</DialogProvider>
                </ReactQueryProvider>
              </AxiosInterceptor>
            </NextIntlClientProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
