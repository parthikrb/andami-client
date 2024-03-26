import AdminNav from "@/components/admin-nav/admin-nav";
import React, { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex w-full flex-row gap-8 p-4">
      <AdminNav />
      <div className="container">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
