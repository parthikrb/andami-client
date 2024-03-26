"use server";

import { joinTeam } from "@/api/team";
import { logger } from "@/lib/logger";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const joinTeamAction = async (data: Record<string, unknown>) => {
  const user = await currentUser();
  const team = await joinTeam({
    ...data,
    userId: user?.id,
  }).catch((err) => {
    logger.error(`Client::Join Team Action: ${err}`);
  });

  if (team) {
    redirect("/dashboard");
  }
  return team;
};
