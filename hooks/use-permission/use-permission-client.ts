"use client";

import { getMe } from "@/api/user";
import { API_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const usePermissionClient = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEYS.USER],
    queryFn: () => getMe(),
  });

  const hasPermission = (permission: string) =>
    data?.permissions
      ?.map((localPermission: any) => localPermission.name)
      ?.includes(permission) || false;

  return {
    canCreate: {
      user: hasPermission("create_user"),
      team: hasPermission("create_team"),
      organization: hasPermission("create_organization"),
      sense: hasPermission("create_sense"),
      initiative: hasPermission("create_initiative"),
      question: hasPermission("create_question"),
    },
    canRead: {
      dashboard: hasPermission("read_dashboard"),
      user: hasPermission("read_user"),
      team: hasPermission("read_team"),
      organization: hasPermission("read_organization"),
      sense: hasPermission("read_sense"),
      initiative: hasPermission("read_initiative"),
      question: hasPermission("read_question"),
    },
    canUpdate: {
      user: hasPermission("update_user"),
      team: hasPermission("update_team"),
      organization: hasPermission("update_organization"),
      sense: hasPermission("update_sense"),
      initiative: hasPermission("update_initiative"),
      question: hasPermission("update_question"),
    },
    canDelete: {
      user: hasPermission("delete_user"),
      team: hasPermission("delete_team"),
      organization: hasPermission("delete_organization"),
      sense: hasPermission("delete_sense"),
      initiative: hasPermission("delete_initiative"),
      question: hasPermission("delete_question"),
    },
    isLoading,
  };
};
