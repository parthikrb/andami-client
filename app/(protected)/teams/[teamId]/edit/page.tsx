"use server";

import { getAllRoles } from "@/api/role";
import { getTeamById } from "@/api/team";
import { getAllUsers } from "@/api/user";
import EditTeamBreadcrumb from "@/components/breadcrumbs/edit-team-breadcrumb";
import { API_KEYS } from "@/constants";
import { usePermissionServer } from "@/hooks/use-permission";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import EditTeamForm from "../../_components/edit-team-form/edit-team-form";

const EditTeamDetailsPage = async ({
  params,
}: {
  params: {
    teamId: string;
  };
}) => {
  const { canUpdate } = await usePermissionServer();

  const teamId = parseInt(params.teamId);

  if (!canUpdate.team) {
    redirect("/dashboard");
  }

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [API_KEYS.TEAM, teamId],
    queryFn: () => getTeamById(teamId),
  });

  await queryClient.fetchQuery({
    queryKey: [API_KEYS.ROLES],
    queryFn: () => getAllRoles(),
  });

  await queryClient.fetchQuery({
    queryKey: [API_KEYS.USERS],
    queryFn: () => getAllUsers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Edit team details</h1>
        <EditTeamBreadcrumb teamId={teamId} />
        <EditTeamForm teamId={teamId} />
      </div>
    </HydrationBoundary>
  );
};

export default EditTeamDetailsPage;
