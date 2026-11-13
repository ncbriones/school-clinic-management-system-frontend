import type { AuthSession } from "@/contexts/auth";

export const getAuthSession = (): AuthSession => {
  return {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    name: localStorage.getItem("name") || "",
  };
};
