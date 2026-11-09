import type { Illness } from "./illness";

// To prevent circular dependency in types
type MedicineIllness = Omit<Illness, "recommendedMedicines">;

export type Medicine = {
  id: number;
  genericName: string;
  stockQuantity: number;
  reorderLevel: number;
  addedAt?: string;
  expiresAt?: string;
  treatedIllnesses?: MedicineIllness[];
};
