"use client";

import { Button } from "@/components/ui/button";
import { ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type ViewTeamButtonProps = {
  id: number;
};

const ViewTeamButton = ({ id }: ViewTeamButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(`/teams/${id}`);
      }}
      className="text-primary"
    >
      <ViewIcon className="h-4 w-4" />
      <span className="sr-only">View</span>
    </Button>
  );
};

export default ViewTeamButton;
