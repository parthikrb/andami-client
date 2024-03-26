"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ViewTeamButton from "./_components/view-team-button/view-team-button";
import EditTeamIconButton from "./_components/edit-team-button/edit-team-icon-button";
import DeleteTeamButton from "./_components/delete-team-button/delete-team-button";

const teamColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded-md"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded-md"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    header: "ID",
    accessorKey: "id",
    size: 60,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Invite code",
    accessorKey: "inviteCode",
    cell: ({ row }) => {
      const inviteCode: string = row.getValue("inviteCode");

      return <span className="text-primary">{inviteCode}</span>;
    },
  },
  {
    header: "Members #",
    accessorKey: "membersCount",
  },
  {
    header: "Admins",
    id: "admins",
    cell: (info) => info.getValue(),
    accessorFn: (row) => {
      const admins = row.admins.map((admin: any) => (
        <Badge key={admin.id} variant="secondary" className="text-xs m-1">
          {admin.firstname} {admin.lastname}
        </Badge>
      ));

      return admins;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id: number = row.getValue("id");

      return (
        <div className="text-right space-x-2 whitespace-nowrap">
          <ViewTeamButton id={id} />
          <EditTeamIconButton id={id} />
          <DeleteTeamButton teamId={id} teamName={row.getValue("name")} />
        </div>
      );
    },
    size: 200,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
    meta: {
      align: "center",
    },
  },
];

export default teamColumns;
