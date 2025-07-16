"use client";

import { IUserPayload } from "@/types/AuthTypes";
import { createContext, useContext } from "react";

interface IAuthContext {
  userInfo: IUserPayload | null;
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
  return (
    <AuthContext.Provider
      value={{
        userInfo: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
