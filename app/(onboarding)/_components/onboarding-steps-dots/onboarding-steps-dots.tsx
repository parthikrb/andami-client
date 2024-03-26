import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import React from "react";
import Dot from "./dot";

const OnboardingStepsDots = () => {
  const { step } = useOnboard();
  return (
    <div className="flex flex-row justify-center gap-8 mt-16">
      <Dot isActive={step >= 0} />
      <Dot isActive={step >= 1} />
      <Dot isActive={step >= 2} />
    </div>
  );
};

export default OnboardingStepsDots;
