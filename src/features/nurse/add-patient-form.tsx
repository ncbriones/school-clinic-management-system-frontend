import React, { useState } from "react";
import { api } from "@/api/axios";

type AddPatientFormProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddPatientForm({
  onClose,
  onSuccess,
}: AddPatientFormProps) {
  const [idNumber, setIdNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idNumber || !firstName || !lastName || !gender) return;

    try {
      await api.post("/api/patients", {
        idNumber,
        firstName,
        lastName,
        gender: gender.toLowerCase(),
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white font-inter">
      <div>
        <label className="block text-sm tracking-wider font-semibold mb-1.5">
          ID Number
        </label>
        <input
          type="text"
          required
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          placeholder="e.g., 24BSIT-0873, 24BSIT-0781"
          className="w-full bg-primary border border-white rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white "
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm tracking-wider font-semibold mb-1.5">
            First Name
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="w-full bg-primary border border-white rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm tracking-wider font-semibold mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full bg-primary border border-white rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 text-white "
          />
        </div>
      </div>

      <div>
        <label className="block text-sm tracking-wider font-semibold mb-1.5">
          Gender
        </label>
        <select
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full bg-primary border border-white rounded-xl p-3 text-sm focus:outline-none focus:border-green-700 "
        >
          <option value="">Choose Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-3 ">
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
          Add Patient
        </button>
      </div>
    </form>
  );
}
