"use server";

import { getAllRoles } from "@/api/role";
import { getAllUsers, getMe } from "@/api/user";
import CreateTeamBreadcrumb from "@/components/breadcrumbs/create-team-breadcrumb";
import { API_KEYS } from "@/constants";
import { usePermissionServer } from "@/hooks/use-permission";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import CreateTeamForm from "../_components/create-team-form/create-team-form";

const CreateTeamPage = async () => {
  const { canCreate } = await usePermissionServer();

  // if (!canCreate.team) {
  //   redirect("/dashboard");
  // }

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [API_KEYS.ME],
    queryFn: () => getMe(),
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
        <h1 className="text-3xl font-bold">Create a new team</h1>
        <CreateTeamBreadcrumb />
        <CreateTeamForm />
      </div>
    </HydrationBoundary>
  );
};

export default CreateTeamPage;
