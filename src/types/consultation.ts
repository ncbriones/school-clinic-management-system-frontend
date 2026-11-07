import type { Illness } from "./illness";
import type { Medicine } from "./medicine";
import type { Patient } from "./patient";

export type Consultation = {
  id: number;
  reasonOfVisit: string;
  medicineQuantityGiven: number;
  patient: Patient;
  illness: Illness;
  medicineGiven: Medicine;
  visitedAt: string;
};
