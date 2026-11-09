import type { Consultation } from "./consultation";

export type Patient = {
  id: number;
  idNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  consultations: Consultation[];
};

export type CreatePatientResponse = Omit<Patient, "consultations">;
