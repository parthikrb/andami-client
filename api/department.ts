"use server";

import { apiFetch } from "@/lib/api-fetch";
import { logger } from "@/lib/logger";

export const getDepartmentById = async (id: number) => {
  logger.info(`API::department: Fetching department - ${id}`);
  return await apiFetch(`/departments/${id}`);
};

export const getAllDepartments = async () => {
  logger.info(`API::department: Fetching all departments`);
  return await apiFetch("/departments");
};
