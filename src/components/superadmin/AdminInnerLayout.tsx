import React from "react";

const AdminInnerLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-6 lg:px-6 px-1 py-3 w-full">{children}</div>;
};

export default AdminInnerLayout;
