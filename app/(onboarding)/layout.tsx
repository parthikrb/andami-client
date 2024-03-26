import { getMe } from "@/api/user";
import AdminNav from "@/components/admin-nav/admin-nav";
import { logger } from "@/lib/logger";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  currentUser,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const OnboardingLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  logger.info(`Client::Onboarding Layout: user - ${user?.id}`);

  const databaseUser = await getMe();

  if (databaseUser?.organizationId !== null) {
    logger.info(
      `Client::Onboarding Layout: organization associated and redirecting to dashboard - ${user?.id}`
    );
    redirect("/dashboard");
  }

  return (
    <main>
      <SignedIn>
        <div className="w-full flex flex-row p-4 gap-8 relative">
          <AdminNav isOnboarding={true} />
          <div className="container">{children}</div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
};

export default OnboardingLayout;
