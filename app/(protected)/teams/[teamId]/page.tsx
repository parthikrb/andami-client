import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { getTeamById } from "@/api/team";
import { API_KEYS } from "@/constants";
import { usePermissionServer } from "@/hooks/use-permission";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import teamDetailColumns from "./team-detail-users-column";
import TeamCard from "../_components/team-card/team-card";
import EditTeamButton from "../_components/edit-team-button/edit-team-button";

const TeamDetailsPage = async ({
  params,
}: {
  params: {
    teamId: string;
  };
}) => {
  const { canRead } = await usePermissionServer();

  if (!canRead.team) {
    redirect("/dashboard");
  }

  const queryClient = new QueryClient();

  const team = await queryClient.fetchQuery({
    queryKey: [API_KEYS.TEAM, params.teamId],
    queryFn: () => getTeamById(Number(params.teamId)),
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Team details</h1>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Andami</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/teams">Teams</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/teams/${params.teamId}`}>
            {params.teamId}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div>
        <div className="flex justify-between">
          <TeamCard
            name={team.name}
            description={team.description}
            membersCount={team.users?.length}
            admins={team.admins?.map(
              (admin: any) => `${admin.firstname} ${admin.lastname}`
            )}
          />
          <EditTeamButton id={team.id} />
        </div>
        <h3 className="text-xl font-bold mt-4">Members</h3>
        <DataTable data={team.users} columns={teamDetailColumns} />
      </div>
    </div>
  );
};

export default TeamDetailsPage;
