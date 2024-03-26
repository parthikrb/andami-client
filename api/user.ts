"use server";

import { apiFetch } from "@/lib/api-fetch";
import { logger } from "@/lib/logger";

export const getMe = async () => {
  logger.info(`API::user: Fetching user(me)`);
  return await apiFetch(`/users/me`);
};

export const updateUser = async (
  id: number,
  data: Record<string, string | number>
) => {
  logger.info(`API::user: Updating user - ${id}`);
  return await apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const createUser = async (data: Record<string, unknown>) => {
  logger.info(`API::user: Creating user - ${data.authId}`);
  return await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAllUsers = async () => {
  logger.info(`API::user: Fetching all users`);
  return await apiFetch("/users");
};
