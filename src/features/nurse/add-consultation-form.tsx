import React, { useState, useEffect } from "react";
import { api } from "@/api/axios";
import type { Illness } from "@/types/illness";
import type { Medicine } from "@/types/medicine";

type AddConsultationFormProps = {
  patientId: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddConsultationForm({
  patientId,
  onClose,
  onSuccess,
}: AddConsultationFormProps) {
  const [illnesses, setIllnesses] = useState<Illness[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);

  // Form Field Tracking Variables
  const [reasonOfVisit, setReasonOfVisit] = useState("");
  const [selectedIllnessId, setSelectedIllnessId] = useState("");
  const [selectedMedicineId, setSelectedMedicineId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize and load list variants from endpoints
  useEffect(() => {
    const fetchDropdownDependencies = async () => {
      try {
        const response = await api.get<Illness[]>("/api/illnesses");
        setIllnesses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDropdownDependencies();
  }, []);

  // Filter out medications dynamically as diagnoses change
  const handleIllnessChange = (illnessIdStr: string) => {
    setSelectedIllnessId(illnessIdStr);
    setSelectedMedicineId(""); // Reset child element configuration parameters

    const targetCondition = illnesses.find(
      (i) => i.id === Number(illnessIdStr),
    );
    if (targetCondition && targetCondition.recommendedMedicines) {
      setFilteredMedicines(targetCondition.recommendedMedicines);
    } else {
      setFilteredMedicines([]);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedIllnessId || !selectedMedicineId || !reasonOfVisit) return;

    try {
      await api.post("/api/consultations", {
        patientId,
        illnessId: Number(selectedIllnessId),
        medicineId: Number(selectedMedicineId),
        reasonOfVisit,
        medicineQuantityGiven: quantity,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white font-inter">
      {/* Reason of Visit TextArea Input */}
      <div>
        <label className="block text-sm tracking-wider font-semibold mb-1.5">
          Reason of Visit
        </label>
        <textarea
          required
          rows={3}
          value={reasonOfVisit}
          onChange={(e) => setReasonOfVisit(e.target.value)}
          placeholder="e.g., high temperature, stomach is hurting, etc."
          className="w-full bg-primary border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white "
        />
      </div>

      <div>
        <label className="block text-sm tracking-wider font-semibold mb-1.5">
          Diagnosis
        </label>
        <select
          required
          value={selectedIllnessId}
          onChange={(e) => handleIllnessChange(e.target.value)}
          className="w-full bg-primary border border-slate-200  rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white capitalize"
        >
          <option value="">Choose Diagnosis</option>
          {illnesses.map((illness) => (
            <option key={illness.id} value={illness.id}>
              {illness.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered Medication Output Field */}
      <div>
        <label className="block text-sm tracking-wider font-semibold mb-1.5">
          Treatment
        </label>
        <select
          required
          disabled={!selectedIllnessId}
          value={selectedMedicineId}
          onChange={(e) => setSelectedMedicineId(e.target.value)}
          className="w-full bg-primary border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedIllnessId
              ? "Select a diagnosis first"
              : "Select Treatment"}
          </option>
          {filteredMedicines.map((med) => {
            const isOutOfStock = med.stockQuantity <= 0;
            return (
              <option key={med.id} value={med.id} disabled={isOutOfStock}>
                {med.genericName}{" "}
                {isOutOfStock
                  ? "(OUT OF STOCK)"
                  : `(${med.stockQuantity} ${med.stockQuantity > 1 ? "stocks left" : "stock left"})`}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm tracking-wider font-semibold  mb-1.5">
          Medicine Quantity Given
        </label>
        <input
          type="number"
          required
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full bg-primary border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-900 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Create Consultation
        </button>
      </div>
    </form>
  );
}
