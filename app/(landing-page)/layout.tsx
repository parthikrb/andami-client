import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const LandingLayout = async ({ children }: { children: ReactNode }) => {
  const user = auth();

  if (user.userId) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
};

export default LandingLayout;
