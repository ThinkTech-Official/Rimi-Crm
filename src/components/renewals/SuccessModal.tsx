import React from "react";
import { MdClose } from "react-icons/md";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl max-w-md w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-inputBorder px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-black">Success</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end gap-3 border-t border-inputBorder">
          <button onClick={onClose} className="btn-primary px-8">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
