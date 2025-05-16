"use client";
import SellerFooter from "@/components/seller-components/layout/footer/SellerFooter";
import SellerHeader from "@/components/seller-components/layout/header/SellerHeader";
import SellerLiveSupport from "@/components/seller-components/live-support/SellerLiveSupport";
import RouteProtect from "@/components/shared/RouteProtect";
import { useAuthContext } from "@/context/AuthContext";
import { companies } from "@/data/companies";
import { setSellerCompany } from "@/store/sellerSlices/SellerCompanySlice";

import { useAppDispatch } from "@/store/store";

import { useEffect } from "react";

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const { userInfo: user } = useAuthContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.companyId) {
      // companyId'ye göre eşleşen şirketi bul
      const company = Object.values(companies).find(
        (c) => c.id === user.companyId
      );

      // Eğer şirket varsa Redux'a aktar
      if (company) {
        dispatch(setSellerCompany(company));
      }
    }
  }, [user]);

  console.log(user);

  return (
    <RouteProtect allowedRoles={["seller"]}>
      <div className="flex flex-col">
        <div className="relative min-h-screen flex flex-col">
          <SellerHeader />
          <div className="flex-1">{children}</div>
          <SellerLiveSupport />
          <SellerFooter />
        </div>
      </div>
    </RouteProtect>
  );
}
