import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-primary text-white w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-all z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-600 text-2xl p-1"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
