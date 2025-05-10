"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingBigCircle from "@/components/shared/Loading/LoadingBigCircle";

const PublicRouteProtection = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      const route = userInfo?.role?.includes("superadmin")
        ? "superadmin/dashboard"
        : userInfo.role.includes("seller")
        ? "seller"
        : "register";
      router.replace(`/${route}`);
    }
  }, [userInfo, router]);

  if (userInfo) {
    return <LoadingBigCircle />;
  }

  return <>{children}</>;
};

export default PublicRouteProtection;
