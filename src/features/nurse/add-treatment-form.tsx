import { api } from "@/api/axios";
import type { Illness } from "@/types/illness";
import type { Medicine } from "@/types/medicine";
import { useState, useEffect } from "react";

type AddTreatmentFormProps = {
  onClose: () => void;
  onSuccess: () => void;
  illness: Illness;
};

const AddTreatmentForm = ({
  onClose,
  onSuccess,
  illness,
}: AddTreatmentFormProps) => {
  const [medicineOptions, setMedicineOptions] = useState<Medicine[]>([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Update this endpoint to match your actual backend route for fetching medicines
        const response = await api.get<Medicine[]>("/api/medicines");
        setMedicineOptions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMedicines();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMedicineId) return;

    const payload = {
      medicineId: Number(selectedMedicineId),
    };

    try {
      await api.post(`/api/illnesses/${illness.id}/medicines`, payload);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block text-sm font-medium mb-1">Target Illness</label>
        <div className="w-full border p-2.5 rounded-lg text-sm font-semibold ">
          {illness.name}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Select Recommended Medicine
        </label>
        <select
          required
          value={selectedMedicineId}
          onChange={(e) => setSelectedMedicineId(e.target.value)}
          className="w-full bg-primary border p-2.5 rounded-lg text-sm outline-none focus:border-green-700"
        >
          <option value="">Choose a Medicine</option>
          {medicineOptions.map((med) => (
            <option key={med.id} value={med.id}>
              {med.genericName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-900 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          Add Treatment
        </button>
      </div>
    </form>
  );
};
export default AddTreatmentForm;
