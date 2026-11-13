import type { Illness } from "@/types/illness";
import Modal from "./modal";
import { useState } from "react";
import AddTreatmentForm from "@/features/nurse/add-treatment-form";

type IllnessCardProps = {
  illness: Illness;
  onSuccess: () => void;
};

const IllnessCard = ({ illness, onSuccess }: IllnessCardProps) => {
  const [isAddTreatmentModalOpen, setIsAddTreatmentModalOpen] =
    useState<boolean>(false);

  const hasTreatments =
    illness.recommendedMedicines && illness.recommendedMedicines.length > 0;

  return (
    <>
      <div className="bg-primary border border-primary/80 rounded-2xl p-6 shadow-md transition-all duration-200 flex flex-col justify-between hover:shadow-lg">
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold text-white font-inter tracking-wide capitalize">
              {illness.name}
            </h2>
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-slate-300 p-2 rounded-md font-inter">
              Diagnosis
            </span>
          </div>

          <div className="mb-6">
            <p className="text-xs text-slate-400 font-inter mb-2.5 uppercase font-semibold tracking-wider">
              Recommended Treatments
            </p>

            {hasTreatments ? (
              <div className="flex flex-wrap gap-2">
                {illness.recommendedMedicines.map((medicine) => (
                  <span
                    key={medicine.id}
                    className="bg-white/10 border border-white/10 text-white text-xs px-3 py-1 rounded-full font-inter font-medium tracking-wide shadow-xs transition-colors hover:bg-white/15"
                  >
                    {medicine.genericName}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-300 font-inter bg-primary p-3 rounded-md border border-white/20">
                No recommended treatments added yet.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setIsAddTreatmentModalOpen(true)}
            className="text-sm bg-green-900 font-bold text-white px-4 py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-sm font-inter tracking-wide flex items-center gap-1"
          >
            <span className="text-sm font-normal">+</span> Add Treatment
          </button>
        </div>
      </div>

      <Modal
        title="Add Treatment"
        isOpen={isAddTreatmentModalOpen}
        onClose={() => setIsAddTreatmentModalOpen(false)}
      >
        <AddTreatmentForm
          onSuccess={onSuccess}
          onClose={() => setIsAddTreatmentModalOpen(false)}
          illness={illness}
        />
      </Modal>
    </>
  );
};

export default IllnessCard;
