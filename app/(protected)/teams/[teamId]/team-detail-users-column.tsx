"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const teamDetailColumns: ColumnDef<any>[] = [
  {
    header: "ID",
    accessorKey: "id",
    size: 60,
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
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      const role: any = row.getValue("role");
      return (
        <Badge key={role?.id} variant="secondary" className="text-xs">
          {role?.name}
        </Badge>
      );
    },
  },
];

export default teamDetailColumns;
