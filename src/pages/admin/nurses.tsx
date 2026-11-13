import { useCallback, useEffect, useState } from "react";
import { api } from "@/api/axios";
import NurseCard from "@/features/admin/nurse-card";
import type { Nurse } from "@/types/user";
import Modal from "@/components/shared/modal";
import AddNurseForm from "@/features/admin/add-nurse-form";
import DeleteConfirmationForm from "@/features/admin/delete-confirmation-form";

const Nurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);

  const [isDeleteNurseModalOpen, setIsDeleteNurseModalOpen] =
    useState<boolean>(false);
  const [isAddNurseModalOpen, setIsAddNurseModalOpen] =
    useState<boolean>(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

  const fetchNurses = useCallback(async () => {
    try {
      const response = await api.get<Nurse[]>("/api/users", {
        params: {
          role: "NURSE",
        },
      });

      setNurses(response.data);
    } catch (error) {
      console.error("Failed to fetch nurse profiles:", error);
    }
  }, []);

  useEffect(() => {
    fetchNurses();
  }, []);

  const handleInitiateDelete = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsDeleteNurseModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedNurse) return;
    try {
      await api.delete(`/api/users/${selectedNurse.id}`);
      setIsDeleteNurseModalOpen(false);
      setSelectedNurse(null);
      await fetchNurses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    fetchNurses();
  };

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      <div className="flex justify-between items-center mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Manage Nurses
          </h1>
          <p className="text-md text-white font-inter">
            Monitor, add, and remove school clinic nurses.
          </p>
        </div>
        <button
          onClick={() => setIsAddNurseModalOpen(true)}
          className="bg-green-900 hover:bg-green-700 text-white font-medium text-md px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          + Add Nurse
        </button>
        <Modal
          title="Add New Nurse"
          isOpen={isAddNurseModalOpen}
          onClose={() => setIsAddNurseModalOpen(false)}
        >
          <AddNurseForm
            onSuccess={handleRefresh}
            onClose={() => setIsAddNurseModalOpen(false)}
          />
        </Modal>
      </div>

      {nurses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {nurses.map((nurse) => (
            <NurseCard
              key={nurse.id}
              nurse={nurse}
              handleInitialDelete={() => handleInitiateDelete(nurse)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-primary border border-primary/60 rounded-2xl p-12 text-center text-slate-400 text-sm w-full">
          No school clinic nurse staff found as of this moment. Add a nurse to
          manage.
        </div>
      )}

      <Modal
        title={`Remove Nurse ${selectedNurse?.name ?? ""}?`}
        isOpen={isDeleteNurseModalOpen}
        onClose={() => setIsDeleteNurseModalOpen(false)}
      >
        <DeleteConfirmationForm
          itemName={selectedNurse?.name ?? ""}
          onConfirm={handleConfirmDelete}
          onClose={() => setIsDeleteNurseModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Nurses;
