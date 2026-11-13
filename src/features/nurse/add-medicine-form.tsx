import { api } from "@/api/axios";
import { useState } from "react";

type AddMedicineFormProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddMedicineForm = ({ onClose, onSuccess }: AddMedicineFormProps) => {
  const [genericName, setGenericName] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number | undefined>(
    undefined,
  );
  const [reorderLevel, setReorderLevel] = useState<number | undefined>(
    undefined,
  );

  const [expiresAt, setExpiresAt] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      genericName,
      stockQuantity,
      reorderLevel,
      expiresAt,
    };

    try {
      await api.post("/api/medicines", payload);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1.5">
          Medicine Name (Generic)
        </label>
        <input
          type="text"
          required
          value={genericName}
          onChange={(e) => setGenericName(e.target.value)}
          placeholder="e.g., Paracetamol, Ibuprofen, Amoxicillin"
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">Stock Quantity</label>
        <input
          type="number"
          value={stockQuantity ?? ""}
          onChange={(e) =>
            setStockQuantity(
              e.target.value === "" ? undefined : parseInt(e.target.value, 10),
            )
          }
          min={0}
          placeholder="Enter stock quantity"
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">Reorder Level</label>
        <input
          type="number"
          value={reorderLevel ?? ""}
          onChange={(e) =>
            setReorderLevel(
              e.target.value === "" ? undefined : parseInt(e.target.value, 10),
            )
          }
          placeholder="Enter reorder level"
          min={0}
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1.5">
          Expiration Date
        </label>
        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          placeholder=""
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
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
          Add Medicine
        </button>
      </div>
    </form>
  );
};

export default AddMedicineForm;
