import React, { memo, useCallback } from "react";
import OnboardingOption from "./onboarding-option";
import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import { Button } from "@/components/ui/button";

const OnboardingOptions = () => {
  const { setStep, setCreateOrJoinTeam } = useOnboard();

  const handleButtonClick = useCallback(
    (option: "join" | "create") => {
      setCreateOrJoinTeam(option);
      setStep(2);
    },
    [setCreateOrJoinTeam, setStep]
  );

  return (
    <div className="flex flex-col gap-4 p-4 border shadow rounded-md">
      <OnboardingOption
        name="Join a team"
        description="Join an existing team and start working together."
        onClick={() => handleButtonClick("join")}
        variant="secondary"
        className="border-primary"
      />
      <OnboardingOption
        name="Create a team"
        description="Create a new team and invite your friends to join."
        onClick={() => handleButtonClick("create")}
        variant="secondary"
        className="border-primary"
      />
      <Button
        variant="outline"
        className="border-primary"
        onClick={() => setStep(0)}
      >
        Back
      </Button>
    </div>
  );
};

export default memo(OnboardingOptions);
