"use client";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type EditTeamButtonProps = {
  id: number;
};

const EditTeamButton = ({ id }: EditTeamButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(`/teams/${id}/edit`);
      }}
      className="text-primary flex gap-2"
    >
      <EditIcon className="h-4 w-4" /> Edit
    </Button>
  );
};

export default EditTeamButton;
