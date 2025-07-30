import React from "react";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
