import { apiFetch } from "@/lib/api-fetch";

export const getAllRoles = async () => {
  return await apiFetch("/roles");
};
