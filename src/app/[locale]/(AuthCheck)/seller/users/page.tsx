import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { SellerUserCreateButton } from "@/components/seller-components/users/SellerUserCreateButton";
import { SellerUsersTable } from "@/components/seller-components/users/SellerUsersTable";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function SellerUsersListPage() {
  return (
    <SellerInnerContainer>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kullanıcılar</h1>
          <p className="text-muted-foreground">
            Sistem kullanıcılarını yönetin ve rolleri atayın.
          </p>
        </div>
        <SellerUserCreateButton />
      </div>
      <Separator className="my-6" />
      <SellerUsersTable />
    </SellerInnerContainer>
  );
}
