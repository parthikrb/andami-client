import { cn } from "@/lib/utils";
import React from "react";

type DotProps = {
  isActive: boolean;
};

const Dot = ({ isActive }: DotProps) => {
  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full",
        isActive ? "bg-primary" : "bg-secondary"
      )}
    ></div>
  );
};

export default Dot;
