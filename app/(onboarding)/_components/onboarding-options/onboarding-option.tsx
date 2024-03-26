"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type OnboardingOptionProps = {
  name: string;
  description: string;
  onClick: () => void;
  variant?: "outline" | "secondary" | "destructive" | "ghost" | "link";
  className?: string;
};

const OnboardingOption = ({
  name,
  description,
  onClick,
  variant,
  className,
}: OnboardingOptionProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn("w-full h-16 flex flex-col justify-center", className)}
      variant={variant}
    >
      <span className="text-2xl font-bold">{name}</span>
      <span className="text-sm text-foreground/70">{description}</span>
    </Button>
  );
};

export default OnboardingOption;
