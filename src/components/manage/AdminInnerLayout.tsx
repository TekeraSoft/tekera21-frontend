"use client";
import React, { useEffect, useState } from "react";

const AdminInnerLayout = ({ children }: { children: React.ReactNode }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 10);

    return () => {
      setAnimated(false);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-6 lg:px-6 px-1 py-3 w-full transform transition-opacity duration-500  ${
        animated ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default AdminInnerLayout;
