"use server";

import { createTeamWithOrganization } from "@/api/team";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export const createOrganizationAndTeamAction = async (
  data: Record<string, unknown>
) => {
  const team = await createTeamWithOrganization({
    ...data,
  })
    .then(() => {
      toast({
        title: "Organization and team created successfully",
        description: "You can now start adding members to your team",
      });
    })
    .then(() => {
      redirect("/dashboard");
    });
  return team;
};
