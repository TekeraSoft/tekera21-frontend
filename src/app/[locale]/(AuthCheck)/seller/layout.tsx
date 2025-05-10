"use client";
import SellerFooter from "@/components/seller-components/layout/footer/SellerFooter";
import SellerHeader from "@/components/seller-components/layout/header/SellerHeader";
import SellerSupport from "@/components/seller-components/support/SellerSupport";
import LoadingBigCircle from "@/components/shared/Loading/LoadingBigCircle";
import { useAuthContext } from "@/context/AuthContext";
import { companies } from "@/data/companies";
import { setSellerCompany } from "@/store/SellerCompanySlice";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/UserSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const { userInfo: user } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (user) {
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

  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex flex-col">
        <SellerHeader />

        {loading ? (
          <LoadingBigCircle />
        ) : (
          <div className="flex-1 ">{children}</div>
        )}

        <SellerSupport />
        <SellerFooter />
      </div>
    </div>
  );
}
