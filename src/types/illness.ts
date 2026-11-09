import type { Medicine } from "./medicine";

// To prevent circular dependency in types
type IllnessMedicine = Omit<Medicine, "treatedIllnesses">;

export type Illness = {
  id: number;
  name: string;
  recommendedMedicines: IllnessMedicine[];
};
