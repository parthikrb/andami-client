"use client";

import { getMe } from "@/api/user";
import { API_KEYS } from "@/constants";
import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DesignationAndDepartmentForm from "../_components/designation-and-department-form/designation-and-department-form";
import OnboardingOptions from "../_components/onboarding-options/onboarding-options";
import CreateTeamForm from "../_components/create-team-form/create-team-form";
import JoinTeamForm from "../_components/join-team-form/join-team-form";
import OnboardingStepsDots from "../_components/onboarding-steps-dots/onboarding-steps-dots";

const OnboardPage = () => {
  const { user } = useUser();
  const { step, createOrJoinTeam } = useOnboard();
  const router: AppRouterInstance = useRouter();

  const { data: meData } = useQuery({
    queryKey: [
      API_KEYS,
      {
        authId: user?.id,
      },
    ],
    queryFn: () => getMe(),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!meData) return;

    if (meData?.organizationId !== null) {
      router.push("/dashboard");
    }
  }, [meData, router]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DesignationAndDepartmentForm meData={meData} />;
      case 1:
        return <OnboardingOptions />;
      case 2:
        return createOrJoinTeam === "create" ? (
          <CreateTeamForm />
        ) : (
          <JoinTeamForm />
        );
      default:
        return <DesignationAndDepartmentForm meData={meData} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold">
          Hello, {user?.firstName}
          <span className="text-primary">.</span>
        </h1>
        <h2 className="text-3xl font-semibold">
          Welcome to <span className="text-primary">andami</span>. Let&apos;s
          get started.
        </h2>
      </div>
      <OnboardingStepsDots />
      <div className="m-auto mt-16 w-full max-w-[600px]">{renderStep()}</div>
    </div>
  );
};

export default OnboardPage;
