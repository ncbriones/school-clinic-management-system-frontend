import { api } from "@/api/axios";
import InventoryCard from "@/components/shared/inventory-card";
import type { Medicine } from "@/types/medicine";
import { useEffect, useState } from "react";

type Inventory = Medicine;

const AdminInventory = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    const fetchInventories = async () => {
      const response = await api.get<Inventory[]>("/api/medicines");

      setInventories(response.data);
    };
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
            View and monitor all inventory of medicines
          </p>
        </div>
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

export default AdminInventory;
