import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type EditTeamIconButtonProps = {
  id: number;
};

const EditTeamIconButton = ({ id }: EditTeamIconButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(`/teams/${id}/edit`);
      }}
      className="text-primary"
    >
      <EditIcon className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  );
};

export default EditTeamIconButton;
