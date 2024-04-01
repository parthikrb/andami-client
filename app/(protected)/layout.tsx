import { createUser, getMe, getUserByAuthId } from "@/api/user";
import AdminNav from "@/components/admin-nav/admin-nav";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();

  if (user?.id) {
    const databaseUser = await getMe();

    if (databaseUser.hasOwnProperty("statusCode")) {
      await createUser({
        authId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        imageUrl: user.imageUrl,
      });
      redirect("/onboard");
    }

    if (!databaseUser?.organizationId) {
      redirect("/onboard");
    }
  }

  return (
    <div className="relative flex w-full flex-row gap-8 p-4">
      <AdminNav />
      <div className="container">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
