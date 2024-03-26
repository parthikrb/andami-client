"use server";

import { apiFetch } from "@/lib/api-fetch";
import { logger } from "@/lib/logger";

export const getDesignationById = async (id: number) => {
  logger.info(`API::designation: Fetching designation - ${id}`);
  return await apiFetch(`/designations/${id}`);
};

export const getAllDesignations = async () => {
  logger.info(`API::designation: Fetching all designations`);
  return await apiFetch("/designations");
};
