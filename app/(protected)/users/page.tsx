import { getAllUsers } from "@/api/user";
import PageHeader from "@/components/page-header/page-header";
import { DataTable } from "@/components/ui/data-table";
import { usePermissionServer } from "@/hooks/use-permission";
import { redirect } from "next/navigation";
import userColumns from "./user-list-column";

const UsersPage = async () => {
  const { canRead } = await usePermissionServer();

  if (!canRead.user) {
    redirect("/dashboard");
  }

  const data = await getAllUsers();

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="List of users associated to the organization"
      />
      <DataTable columns={userColumns} data={data} />
    </div>
  );
};

export default UsersPage;
