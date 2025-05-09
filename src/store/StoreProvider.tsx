"use client";

import { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { setUser } from "./UserSlice";
import { setSellerCompany } from "./SellerCompanySlice";
import { companies } from "@/data/companies";

function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  // useEffect(() => {
  //   if (user) {
  //     store.dispatch(setUser(user));
  //   }
  //   console.log(user);
  //   if (user?.companyId) {
  //     // companyId'ye göre eşleşen şirketi bul
  //     const company = Object.values(companies).find(
  //       (c) => c.id === user.companyId
  //     );

  //     // Eğer şirket varsa Redux'a aktar
  //     if (company) {
  //       store.dispatch(setSellerCompany(company));
  //     }
  //   }
  // }, [user]);

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
