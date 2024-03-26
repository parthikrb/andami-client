import { apiFetch } from "@/lib/api-fetch";
import { logger } from "@/lib/logger";

export const getDashboardInfo = async () => {
  logger.info(`API::dashboard: Fetching dashboard info`);
  return await apiFetch("/dashboard");
};
