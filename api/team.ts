"use server";

import { apiFetch } from "@/lib/api-fetch";
import { logger } from "@/lib/logger";

export const getAllTeams = async () => {
  logger.info(`API::team: Getting all teams`);
  return await apiFetch("/teams");
};

export const createTeamWithOrganization = async (
  data: Record<string, unknown>
) => {
  logger.info(`API::team: Creating team with organization - ${data.name}`);
  return await apiFetch("/teams", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const joinTeam = async (data: Record<string, unknown>) => {
  logger.info(`API::team: Joining team - ${data.inviteCode}`);
  return await apiFetch("/teams/join", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getTeamById = async (teamId: number) => {
  logger.info(`API::team: Getting team by ID - ${teamId}`);
  return await apiFetch(`/teams/${teamId}`);
};

export const updateTeam = async (
  teamId: number,
  data: Record<string, unknown>
) => {
  logger.info(`API::team: Updating team - ${teamId}`);
  return await apiFetch(`/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteTeam = async (teamId: number) => {
  logger.info(`API::team: Deleting team - ${teamId}`);
  return await apiFetch(`/teams/${teamId}`, {
    method: "DELETE",
  });
};
