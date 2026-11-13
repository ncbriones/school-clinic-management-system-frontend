import { api } from "@/api/axios";
import IllnessCard from "@/components/shared/illness-card";
import Modal from "@/components/shared/modal";
import AddIllnessForm from "@/features/nurse/add-illness-form";
import type { Illness } from "@/types/illness";
import { useEffect, useState } from "react";

const Protocol = () => {
  const [illnesses, setIllnesses] = useState<Illness[]>([]);

  const [isAddIllnessModalOpen, setIsAddIllnessModalOpen] =
    useState<boolean>(false);

  const fetchIllnesses = async () => {
    const response = await api.get<Illness[]>("/api/illnesses");

    setIllnesses(response.data);
  };

  useEffect(() => {
    fetchIllnesses();
  }, []);

  const handleRefresh = () => {
    fetchIllnesses();
  };

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      <div className="flex justify-between items-center mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Manage Illnesses
          </h1>
          <p className="text-md text-white font-inter">
            Add medical diagnosis and configure their recommended treatment.
          </p>
        </div>
        <button
          onClick={() => setIsAddIllnessModalOpen(true)}
          className="bg-green-900 hover:bg-green-700 text-white font-medium text-md px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          + Add Illness
        </button>
        <Modal
          title="Add Illness"
          isOpen={isAddIllnessModalOpen}
          onClose={() => setIsAddIllnessModalOpen(false)}
        >
          <AddIllnessForm
            onClose={() => setIsAddIllnessModalOpen(false)}
            onSuccess={() => fetchIllnesses()}
          />
        </Modal>
      </div>
      {illnesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {illnesses.map((illness) => (
            <IllnessCard
              key={illness.id}
              illness={illness}
              onSuccess={handleRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="bg-primary border border-primary/60 rounded-2xl p-12 text-center text-slate-300 text-sm w-full">
          No medicines in the inventory is found as of the moment.
        </div>
      )}
    </div>
  );
};

export default Protocol;
