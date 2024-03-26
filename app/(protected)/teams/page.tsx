import PageHeader from "@/components/page-header/page-header";
import { DataTable } from "@/components/ui/data-table";
import { API_KEYS } from "@/constants";
import { usePermissionServer } from "@/hooks/use-permission";
import { logger } from "@/lib/logger";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import teamColumns from "./team-list-column";
import CreateTeamButton from "./_components/create-team-button/create-team-button";
import { getAllTeams } from "@/api/team";

const TeamsPage = async () => {
  const { canRead } = await usePermissionServer();

  if (!canRead.team) {
    redirect("/dashboard");
  }

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [API_KEYS.TEAMS],
    queryFn: () => getAllTeams(),
  });

  const data = queryClient.getQueryData([API_KEYS.TEAMS]) as any[];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col w-full">
        <PageHeader title="Teams" subtitle="A place to manage your teams" />
        <DataTable columns={teamColumns} data={data} />
        <CreateTeamButton />
      </div>
    </HydrationBoundary>
  );
};

export default TeamsPage;
