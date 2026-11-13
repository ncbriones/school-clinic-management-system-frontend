import { api } from "@/api/axios";
import { useState, useEffect } from "react";

type AddIllnessFormProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddIllnessForm = ({ onClose, onSuccess }: AddIllnessFormProps) => {
  const [illnessName, setIllnessName] = useState<string>("");
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean | null>(null);
  const [checkingName, setCheckingName] = useState<boolean>(false);

  useEffect(() => {
    if (!illnessName.trim()) {
      setIsNameDuplicate(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setCheckingName(true);
      try {
        const response = await api.get<{ exists: boolean }>(
          `/api/illnesses/check?name=${encodeURIComponent(illnessName.trim())}`,
        );
        setIsNameDuplicate(response.data.exists);
      } catch (error) {
        console.error("Error verifying name uniqueness:", error);
        setIsNameDuplicate(null);
      } finally {
        setCheckingName(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [illnessName]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!illnessName.trim() || isNameDuplicate === true || checkingName) {
      return;
    }

    const payload = {
      illnessName: illnessName.trim(),
    };

    try {
      await api.post("/api/illnesses", payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1.5">Illness Name</label>
        <div className="relative">
          <input
            type="text"
            required
            value={illnessName}
            onChange={(e) => setIllnessName(e.target.value)}
            placeholder="Enter Illness Name"
            className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
          />
        </div>

        {isNameDuplicate === false && !checkingName && (
          <p className="text-sm text-green-600 font-medium mt-1">
            Illness name is available
          </p>
        )}
        {isNameDuplicate === true && !checkingName && (
          <p className="text-sm text-red-600 font-medium mt-1">
            Illness name already exists
          </p>
        )}
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
          disabled={
            checkingName || isNameDuplicate === true || !illnessName.trim()
          }
          className="px-4 py-2 bg-green-900 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Illness
        </button>
      </div>
    </form>
  );
};

export default AddIllnessForm;
