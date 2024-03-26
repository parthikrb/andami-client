import { auth } from "@clerk/nextjs";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const user = auth();
  const url = `${baseURL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${await user.getToken()}`,
    },
  });
  return response.json();
}
