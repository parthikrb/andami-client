"use client";
import { YELLOW } from "@/constants";
import { usePermissionClient } from "@/hooks/use-permission";
import { UserButton } from "@clerk/nextjs";
import {
  Boxes,
  Egg,
  LayoutDashboard,
  Loader2Icon,
  Send,
  ShipWheel,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "../theme-switcher/theme-switcher";
import NavItem from "./nav-item";

type AdminNavProps = {
  isOnboarding?: boolean;
};

const AdminNav = ({ isOnboarding = false }: AdminNavProps) => {
  const router = useRouter();

  const { canRead, isLoading } = usePermissionClient();

  return (
    <div className="flex flex-col items-center justify-between w-4 h-[96vh] px-8 py-4 rounded-lg border shadow">
      <div className="flex flex-col items-center gap-4">
        <Egg
          color={YELLOW}
          fill={YELLOW}
          size={32}
          onClick={() => {
            router.push("/");
          }}
        />
        <hr className="w-full" />
        {isLoading && (
          <Loader2Icon className="w-8 h-8 animate-spin text-foreground/60" />
        )}
        {isOnboarding ? (
          <NavItem href="/onboard" Icon={ShipWheel} name="Onboard" />
        ) : (
          <div className=" flex flex-col gap-2">
            {canRead.dashboard && (
              <NavItem
                href="/dashboard"
                Icon={LayoutDashboard}
                name="Dashboard"
              />
            )}
            {canRead.user && (
              <NavItem href="/users" Icon={Users} name="Users" />
            )}
            {canRead.team && (
              <NavItem href="/teams" Icon={Boxes} name="Teams" />
            )}
            {canRead.sense && (
              <NavItem href="/senses" Icon={Send} name="Senses" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </div>
  );
};

export default AdminNav;
