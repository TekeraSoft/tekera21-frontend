"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
