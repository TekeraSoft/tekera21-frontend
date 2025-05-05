import React from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-xl">{children} </div>;
}
