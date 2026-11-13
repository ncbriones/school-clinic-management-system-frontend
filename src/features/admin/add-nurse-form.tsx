import { api } from "@/api/axios";
import React, { useState } from "react";

type AddNurseFormProps = {
  onSuccess: () => void;
  onClose: () => void;
};

const AddNurseForm = ({ onSuccess, onClose }: AddNurseFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      role: "NURSE",
    };

    try {
      await api.post("/api/users", payload);

      onSuccess();

      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      console.error("Failed to register nurse:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1.5">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Nurse Name"
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@gmail.com"
          className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-950 focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
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
          Add Nurse
        </button>
      </div>
    </form>
  );
};

export default AddNurseForm;
