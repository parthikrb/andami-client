"use client";
import FloatingActionButton from "@/components/ui/floating-action-button";
import { useRouter } from "next/navigation";

const CreateTeamButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/teams/create");
  };

  return <FloatingActionButton name="Create Team" onClick={handleClick} />;
};

export default CreateTeamButton;
