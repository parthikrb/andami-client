"use server";

import { getMe, updateUser } from "@/api/user";

export const updateDesignationAndDepartmentAction: (
  formData: Record<string, string | number>
) => Promise<void> = async (formData: Record<string, string | number>) => {
  const meData = await getMe();
  await updateUser(meData?.id, formData);
};
