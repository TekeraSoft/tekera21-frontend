// Define isSpace function globally for markdown-it
declare global {
  function isSpace(code: number): boolean;
}

// Define the isSpace function
globalThis.isSpace = function (code: number): boolean {
  return (
    code === 0x20 ||
    code === 0x09 ||
    code === 0x0a ||
    code === 0x0b ||
    code === 0x0c ||
    code === 0x0d
  );
};

import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

import AuthProvider from "@/context/AuthContext";
import { AxiosInterceptor } from "@/request/axiosClient";
import DialogProvider from "@/context/DialogContext";
import { Toaster } from "@/components/ui/toaster";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/providers/ReactQuery";
import { getUser } from "../actions/server/auth.actions";
import Script from "next/script";

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
  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  const queryClient = new QueryClient();
  const user = await getUser();
  const dehydratedState = dehydrate(queryClient);

  const originalStderrWrite = process.stderr.write.bind(process.stderr);

  process.stderr.write = ((
    ...args: Parameters<typeof process.stderr.write>
  ) => {
    const chunk = args[0];
    const msg =
      chunk && typeof chunk.toString === "function" ? chunk.toString() : "";

    if (
      msg.includes("upstream image response failed") ||
      msg.includes('"url" parameter is valid but upstream response is invalid')
    ) {
      return true; // loglama
    }

    return originalStderrWrite(...args);
  }) as typeof process.stderr.write;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Define isSpace function globally to fix markdown-it issues with Next.js + Turbopack */}
        <Script id="markdown-it-fix" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && typeof window.isSpace === 'undefined') {
              window.isSpace = function(code) {
                return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
              };
            }
          `}
        </Script>
      </head>
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
