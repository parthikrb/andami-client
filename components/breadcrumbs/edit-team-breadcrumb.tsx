import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

type EditTeamBreadcrumbProps = {
  teamId: number;
};

const EditTeamBreadcrumb = ({ teamId }: EditTeamBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Andami</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/teams">Teams</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/teams/${teamId}`}>{teamId}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href={`/teams/${teamId}/edit`}>Edit</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default EditTeamBreadcrumb;
