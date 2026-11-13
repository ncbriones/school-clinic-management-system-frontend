import type React from "react";

type DeleteConfirmationFormProps = {
  itemName: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

const DeleteConfirmationForm = ({
  itemName,
  onConfirm,
  onClose,
}: DeleteConfirmationFormProps) => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm text-white leading-relaxed mb-6">
        Are you sure you want to permanently delete Nurse{" "}
        <strong className="text-white font-semibold">{itemName}</strong>? This
        action cannot be reversed.
      </p>

      <div className="flex justify-end space-x-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-3.5 py-2 bg-white border border-slate-200 text-black rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3.5 py-2 bg-red-800 hover:bg-[#d3111e] text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-red-600/10"
        >
          Confirm Delete
        </button>
      </div>
    </form>
  );
};

export default DeleteConfirmationForm;
