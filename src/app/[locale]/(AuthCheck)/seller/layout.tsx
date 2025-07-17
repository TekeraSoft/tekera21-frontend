"use client";
import SellerFooter from "@/components/seller-components/layout/footer/SellerFooter";
import SellerHeader from "@/components/seller-components/layout/Header/SellerHeader";
import SellerLiveSupport from "@/components/seller-components/live-support/SellerLiveSupport";
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
    if (user?.email) {
      // companyId'ye göre eşleşen şirketi bul
      const company = Object.values(companies).find(
        (c) => c.email === user.email
      );

      // Eğer şirket varsa Redux'a aktar
      if (company) {
        dispatch(setSellerCompany(company));
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex flex-col">
        <SellerHeader />
        <div className="flex-1">{children}</div>
        <SellerLiveSupport />
        <SellerFooter />
      </div>
    </div>
  );
}
