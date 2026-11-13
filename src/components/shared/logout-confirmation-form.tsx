type LogoutConfirmationFormProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmationForm = ({
  onClose,
  onConfirm,
}: LogoutConfirmationFormProps) => {
  return (
    <div>
      <p className="text-sm text-white leading-relaxed mb-6">
        Are you sure you want to log out? You will need to re-enter your
        credentials to log back in again.
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
          onClick={onConfirm}
          className="px-3.5 py-2 bg-green-900 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-red-600/10"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmationForm;
