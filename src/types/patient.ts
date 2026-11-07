import type { Consultation } from "./consultation";

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  consultations: Consultation[];
};
