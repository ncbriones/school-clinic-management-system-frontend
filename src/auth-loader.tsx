import { redirect } from "react-router-dom";

export const authLoader = (allowedRoles: string[]) => {
  return () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return redirect("/login");
    }

    if (!role || !allowedRoles.includes(role)) {
      return redirect("/login");
    }

    return null;
  };
};
