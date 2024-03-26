"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const userColumns: ColumnDef<any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    id: "fullName",
    header: "Full Name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Designation",
    accessorKey: "designation.title",
  },
  {
    header: "Department",
    accessorKey: "department.name",
  },
  {
    header: "Teams",
    accessorKey: "teams",
    cell: ({ row }) => {
      const teams: any = row.getValue("teams");
      return teams?.map((team: any) => (
        <Badge key={team.id} variant="secondary" className="text-xs m-1">
          {team.name}
        </Badge>
      ));
    },
  },
];

export default userColumns;
