"use client";
import { companies } from "@/data/companies";
import { setSellerCompany } from "@/store/SellerCompanySlice";
import { AppDispatch } from "@/store/store";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface IAuthContext {
  userInfo: any;
}

export const AuthContext = createContext<IAuthContext>({
  userInfo: null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    if (user) {
      if (user?.companyId) {
        // companyId'ye göre eşleşen şirketi bul
        const company = Object.values(companies).find(
          (c) => c.id === user.companyId
        );

        // Eğer şirket varsa Redux'a aktar
        if (company) {
          setUserInfo({ ...user, company: company });
        }
      }
    }

    return () => {};
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
