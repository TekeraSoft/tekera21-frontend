"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingBigCircle from "./Loading/LoadingBigCircle";

const RouteProtect = ({
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
      router.replace("/unauthorized");
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

export default RouteProtect;
