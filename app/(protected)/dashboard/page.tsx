import { getDashboardInfo } from "@/api/dashboard";
import PageHeader from "@/components/page-header/page-header";
import { currentUser } from "@clerk/nextjs";
import CountsCard from "./_components/counts-card/counts-card";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const dashboardInfo = await getDashboardInfo();

  return (
    <div className="flex flex-col gap-8 w-[100%] max-w-full">
      <PageHeader title="Dashboard" />
      <div className="flex flex-row gap-8 w-[100%]">
        <CountsCard name="Users" count={dashboardInfo.users} />
        <CountsCard name="Teams" count={dashboardInfo.teams} />
      </div>
    </div>
  );
};

export default DashboardPage;
