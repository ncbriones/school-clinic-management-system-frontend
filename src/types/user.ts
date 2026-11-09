type Role = "NURSE" | "ADMIN";

export type Nurse = {
  id: number;
  name: string;
  email: string;
  role: Exclude<Role, "ADMIN">;
};

export type Admin = {
  id: number;
  name: string;
  email: string;
  role: Exclude<Role, "NURSE">;
};

export type User = Nurse | Admin;
