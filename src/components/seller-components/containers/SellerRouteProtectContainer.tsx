"use client";

import LoadingBigCircle from "@/components/shared/Loading/LoadingBigCircle";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const SellerRouteProtectContainer = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { userInfo } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.replace("/login");
    } else if (
      !userInfo.role?.some((role: string) => allowedRoles.includes(role))
    ) {
      router.replace("/seller-unauthorized");
    }
  }, [userInfo, allowedRoles, router]);

  if (
    !userInfo ||
    !userInfo.role?.some((role: string) => allowedRoles.includes(role))
  ) {
    return <LoadingBigCircle />;
  }

  return <>{children}</>;
};
