import { api } from "@/api/axios";
import InventoryCard from "@/components/shared/inventory-card";
import Modal from "@/components/shared/modal";
import AddMedicineForm from "@/features/nurse/add-medicine-form";
import type { Medicine } from "@/types/medicine";
import { useEffect, useState } from "react";

type Inventory = Medicine;

const Inventory = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  const [isAddMedicineModalOpen, setIsAddMedicineModalOpen] =
    useState<boolean>(false);

  const fetchInventories = async () => {
    const response = await api.get<Inventory[]>("/api/medicines");

    setInventories(response.data);
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      <div className="flex justify-between items-center mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Medicine Inventory
          </h1>
          <p className="text-md text-white font-inter">
            Add and monitor all inventory of medicines
          </p>
        </div>
        <button
          onClick={() => setIsAddMedicineModalOpen(true)}
          className="bg-green-900 hover:bg-green-700 text-white font-medium text-md px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          + Add Medicine
        </button>
        <Modal
          title="Add Medicine"
          isOpen={isAddMedicineModalOpen}
          onClose={() => setIsAddMedicineModalOpen(false)}
        >
          <AddMedicineForm
            onClose={() => setIsAddMedicineModalOpen(false)}
            onSuccess={() => fetchInventories()}
          />
        </Modal>
      </div>

      {inventories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {inventories.map((inventory) => (
            <InventoryCard key={inventory.id} inventory={inventory} />
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

export default Inventory;
