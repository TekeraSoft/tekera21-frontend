"use client";

import React from "react";

const RouteProtect = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  return <>{children}</>;
};

export default RouteProtect;
